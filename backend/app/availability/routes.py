from datetime import time
from flask import Blueprint, request
from ..extensions import db
from ..common.models import Availability
from ..common.auth import require_roles, ROLE_ADMIN


availability_bp = Blueprint("availability", __name__)


@availability_bp.get("")
@require_roles(ROLE_ADMIN)
def list_availability():
    items = Availability.query.order_by(Availability.day_of_week.asc()).all()
    data = [
        {
            "id": item.id,
            "modality": item.modality,
            "day_of_week": item.day_of_week,
            "start_time": item.start_time.isoformat(),
            "end_time": item.end_time.isoformat(),
        }
        for item in items
    ]
    return {"items": data}


@availability_bp.post("")
@require_roles(ROLE_ADMIN)
def create_availability():
    payload = request.get_json() or {}
    item = Availability(
        modality=payload.get("modality"),
        day_of_week=payload.get("day_of_week"),
        start_time=time.fromisoformat(payload.get("start_time")),
        end_time=time.fromisoformat(payload.get("end_time")),
    )
    db.session.add(item)
    db.session.commit()
    return {"id": item.id}
