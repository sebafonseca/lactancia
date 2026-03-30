from datetime import datetime
from flask import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..extensions import db
from ..common.models import Appointment, Case, Session
from ..common.auth import require_roles, ROLE_ADMIN


appointments_bp = Blueprint("appointments", __name__)


@appointments_bp.post("")
@jwt_required()
def create_appointment():
    payload = request.get_json() or {}
    modality = payload.get("modality")
    datetime_str = payload.get("datetime")
    duration = payload.get("duration")
    reason = payload.get("reason")

    if not modality or not datetime_str or not duration:
        return {"error": "modality, datetime y duration son requeridos"}, 400

    appointment_datetime = datetime.fromisoformat(datetime_str)
    payment_status = "PENDING_PAYMENT" if modality == "online" else "NOT_REQUIRED"
    status = "PENDING_PAYMENT" if modality == "online" else "PENDING_APPROVAL"

    appointment = Appointment(
        user_id=int(get_jwt_identity()),
        modality=modality,
        datetime=appointment_datetime,
        duration=duration,
        reason=reason,
        status=status,
        payment_status=payment_status,
        location=payload.get("location"),
    )

    db.session.add(appointment)
    db.session.commit()

    return {"id": appointment.id, "status": appointment.status, "payment_status": appointment.payment_status}


@appointments_bp.get("")
@require_roles(ROLE_ADMIN)
def list_appointments():
    filters = request.args
    query = Appointment.query

    if "status" in filters:
        query = query.filter_by(status=filters["status"])
    if "modality" in filters:
        query = query.filter_by(modality=filters["modality"])

    data = [
        {
            "id": a.id,
            "user_id": a.user_id,
            "modality": a.modality,
            "datetime": a.datetime.isoformat(),
            "duration": a.duration,
            "status": a.status,
            "payment_status": a.payment_status,
        }
        for a in query.order_by(Appointment.datetime.desc()).all()
    ]
    return {"items": data}


@appointments_bp.patch("/<int:appointment_id>")
@require_roles(ROLE_ADMIN)
def update_appointment(appointment_id):
    payload = request.get_json() or {}
    appointment = Appointment.query.get_or_404(appointment_id)

    if payload.get("action") == "approve":
        if appointment.modality == "online" and appointment.payment_status != "PAID":
            return {"error": "payment_required"}, 400
        appointment.status = "CONFIRMED"
    elif payload.get("action") == "reject":
        appointment.status = "REJECTED"
    if "meeting_url" in payload:
        appointment.meeting_url = payload.get("meeting_url")

    db.session.commit()

    if appointment.status == "CONFIRMED":
        case = Case.query.filter_by(user_id=appointment.user_id).first()
        if not case:
            case = Case(user_id=appointment.user_id)
            db.session.add(case)
            db.session.commit()
        session = Session(case_id=case.id, appointment_id=appointment.id, status="scheduled")
        db.session.add(session)
        db.session.commit()

    return {"id": appointment.id, "status": appointment.status}
