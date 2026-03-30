from flask import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..extensions import db
from ..common.models import Appointment


payments_bp = Blueprint("payments", __name__)


@payments_bp.post("/mercadopago/preference")
@jwt_required()
def create_preference():
    payload = request.get_json() or {}
    appointment_id = payload.get("appointment_id")
    if not appointment_id:
        return {"error": "appointment_id requerido"}, 400

    appointment = Appointment.query.get_or_404(appointment_id)
    if appointment.user_id != int(get_jwt_identity()):
        return {"error": "forbidden"}, 403
    appointment.payment_status = "PENDING_PAYMENT"
    db.session.commit()

    return {"preference_id": f"pref_{appointment.id}", "checkout_url": "https://mpago.test/checkout"}


@payments_bp.post("/mercadopago/webhook")
def webhook():
    payload = request.get_json() or {}
    appointment_id = payload.get("appointment_id")
    status = payload.get("status")

    if not appointment_id or not status:
        return {"error": "invalid"}, 400

    appointment = Appointment.query.get_or_404(appointment_id)
    if status == "approved":
        appointment.payment_status = "PAID"
        appointment.status = "PENDING_APPROVAL"
    elif status == "cancelled":
        appointment.payment_status = "CANCELED"
        appointment.status = "CANCELED"
    else:
        appointment.payment_status = "PENDING_PAYMENT"
    db.session.commit()

    return {"ok": True}
