from flask import Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..common.models import User, Case


users_bp = Blueprint("users", __name__)


@users_bp.get("/me")
@jwt_required()
def me():
    user_id = get_jwt_identity()
    user = User.query.get(int(user_id))
    if not user:
        return {"error": "not_found"}, 404
    return {"id": user.id, "email": user.email, "name": user.name, "role": user.role}


@users_bp.get("/my-case")
@jwt_required()
def my_case():
    user_id = get_jwt_identity()
    case = Case.query.filter_by(user_id=int(user_id)).first()
    if not case:
        return {"case": None}

    return {
        "case": {
            "id": case.id,
            "status": case.status,
            "goals": [{"id": g.id, "title": g.title, "status": g.status} for g in case.goals],
            "tasks": [{"id": t.id, "title": t.title, "done": t.done} for t in case.tasks],
            "sessions": [
                {
                    "id": s.id,
                    "status": s.status,
                    "notes_public": s.notes_public,
                    "created_at": s.created_at.isoformat(),
                }
                for s in case.sessions
            ],
        }
    }
