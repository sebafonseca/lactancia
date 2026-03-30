from flask import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..extensions import db
from ..common.models import Case, Goal, Session, Task
from ..common.auth import require_roles, ROLE_ADMIN


cases_bp = Blueprint("cases", __name__)


@cases_bp.get("")
@require_roles(ROLE_ADMIN)
def list_cases():
    items = Case.query.order_by(Case.created_at.desc()).all()
    data = [
        {
            "id": item.id,
            "user_id": item.user_id,
            "status": item.status,
            "created_at": item.created_at.isoformat(),
        }
        for item in items
    ]
    return {"items": data}


@cases_bp.post("")
@require_roles(ROLE_ADMIN)
def create_case():
    payload = request.get_json() or {}
    case = Case(user_id=payload.get("user_id"), status=payload.get("status", "ACTIVE"))
    db.session.add(case)
    db.session.commit()
    return {"id": case.id}


@cases_bp.patch("/<int:case_id>")
@require_roles(ROLE_ADMIN)
def update_case(case_id):
    payload = request.get_json() or {}
    case = Case.query.get_or_404(case_id)

    if "status" in payload:
        case.status = payload["status"]

    if "goals" in payload:
        case.goals.clear()
        for goal in payload["goals"]:
            case.goals.append(Goal(title=goal["title"], status=goal.get("status", "in_progress")))

    if "tasks" in payload:
        case.tasks.clear()
        for task in payload["tasks"]:
            case.tasks.append(Task(title=task["title"], done=task.get("done", False)))

    if "sessions" in payload:
        case.sessions.clear()
        for session in payload["sessions"]:
            case.sessions.append(
                Session(
                    notes_public=session.get("notes_public"),
                    notes_private=session.get("notes_private"),
                    status=session.get("status", "scheduled"),
                )
            )

    db.session.commit()
    return {"id": case.id, "status": case.status}


@cases_bp.get("/my")
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
