from flask import Blueprint, request, current_app
from ..extensions import db
from ..common.models import User
from ..common.auth import require_roles, ROLE_DEV_ADMIN


devadmin_bp = Blueprint("devadmin", __name__)


@devadmin_bp.get("/users")
@require_roles(ROLE_DEV_ADMIN)
def list_users():
    items = User.query.order_by(User.created_at.desc()).all()
    return {
        "items": [
            {"id": u.id, "email": u.email, "name": u.name, "role": u.role}
            for u in items
        ]
    }


@devadmin_bp.patch("/users/<int:user_id>/role")
@require_roles(ROLE_DEV_ADMIN)
def update_role(user_id):
    payload = request.get_json() or {}
    user = User.query.get_or_404(user_id)
    role = payload.get("role")
    if role not in ["CLIENT", "ADMIN", "DEV_ADMIN"]:
        return {"error": "invalid_role"}, 400
    user.role = role
    db.session.commit()
    return {"id": user.id, "role": user.role}


@devadmin_bp.get("/health")
@require_roles(ROLE_DEV_ADMIN)
def health():
    return {
        "version": current_app.config.get("APP_VERSION"),
        "env": current_app.config.get("ENVIRONMENT"),
    }


@devadmin_bp.get("/config")
@require_roles(ROLE_DEV_ADMIN)
def config():
    return {"flags": {"payments_enabled": True}, "texts": {"cta": "Reserva tu consulta"}}
