from flask import Blueprint, request
from ..extensions import db
from ..common.models import SuccessCase, FAQ
from ..common.auth import require_roles, ROLE_ADMIN


content_bp = Blueprint("content", __name__)


@content_bp.get("/success-cases")
def list_success_cases():
    items = SuccessCase.query.filter_by(published=True).all()
    return {
        "items": [
            {
                "id": item.id,
                "title": item.title,
                "summary": item.summary,
                "content": item.content,
            }
            for item in items
        ]
    }


@content_bp.post("/success-cases")
@require_roles(ROLE_ADMIN)
def create_success_case():
    payload = request.get_json() or {}
    item = SuccessCase(
        title=payload.get("title"),
        summary=payload.get("summary"),
        content=payload.get("content"),
        published=payload.get("published", True),
    )
    db.session.add(item)
    db.session.commit()
    return {"id": item.id}


@content_bp.patch("/success-cases/<int:item_id>")
@require_roles(ROLE_ADMIN)
def update_success_case(item_id):
    payload = request.get_json() or {}
    item = SuccessCase.query.get_or_404(item_id)
    for field in ["title", "summary", "content", "published"]:
        if field in payload:
            setattr(item, field, payload[field])
    db.session.commit()
    return {"id": item.id}


@content_bp.delete("/success-cases/<int:item_id>")
@require_roles(ROLE_ADMIN)
def delete_success_case(item_id):
    item = SuccessCase.query.get_or_404(item_id)
    db.session.delete(item)
    db.session.commit()
    return {"deleted": True}


@content_bp.get("/faqs")
def list_faqs():
    items = FAQ.query.filter_by(published=True).order_by(FAQ.order.asc()).all()
    return {
        "items": [
            {
                "id": item.id,
                "question": item.question,
                "answer": item.answer,
                "order": item.order,
            }
            for item in items
        ]
    }


@content_bp.post("/faqs")
@require_roles(ROLE_ADMIN)
def create_faq():
    payload = request.get_json() or {}
    item = FAQ(
        question=payload.get("question"),
        answer=payload.get("answer"),
        order=payload.get("order", 0),
        published=payload.get("published", True),
    )
    db.session.add(item)
    db.session.commit()
    return {"id": item.id}


@content_bp.patch("/faqs/<int:item_id>")
@require_roles(ROLE_ADMIN)
def update_faq(item_id):
    payload = request.get_json() or {}
    item = FAQ.query.get_or_404(item_id)
    for field in ["question", "answer", "order", "published"]:
        if field in payload:
            setattr(item, field, payload[field])
    db.session.commit()
    return {"id": item.id}


@content_bp.delete("/faqs/<int:item_id>")
@require_roles(ROLE_ADMIN)
def delete_faq(item_id):
    item = FAQ.query.get_or_404(item_id)
    db.session.delete(item)
    db.session.commit()
    return {"deleted": True}
