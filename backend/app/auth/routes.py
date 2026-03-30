from flask import Blueprint, request
from flask_jwt_extended import create_access_token
from ..extensions import db
from ..common.models import User


auth_bp = Blueprint("auth", __name__)


def _oauth_login(provider):
    payload = request.get_json() or {}
    email = payload.get("email")
    name = payload.get("name")

    if not email or not name:
        return {"error": "email y name son requeridos"}, 400

    user = User.query.filter_by(email=email).first()
    if not user:
        user = User(email=email, name=name, provider=provider, role="CLIENT")
        db.session.add(user)
        db.session.commit()

    token = create_access_token(identity=str(user.id), additional_claims={"role": user.role})
    return {
        "access_token": token,
        "user": {"id": user.id, "email": user.email, "name": user.name, "role": user.role},
    }


@auth_bp.post("/google")
def google_login():
    return _oauth_login("GOOGLE")


@auth_bp.post("/facebook")
def facebook_login():
    return _oauth_login("FACEBOOK")
