from .extensions import db
from .common.models import User


def seed_admins(dev_admin_email, admin_email):
    if dev_admin_email:
        existing = User.query.filter_by(email=dev_admin_email).first()
        if not existing:
            db.session.add(
                User(
                    email=dev_admin_email,
                    name="Dev Admin",
                    role="DEV_ADMIN",
                    provider="SEED",
                )
            )
    if admin_email:
        existing = User.query.filter_by(email=admin_email).first()
        if not existing:
            db.session.add(
                User(
                    email=admin_email,
                    name="Asesora",
                    role="ADMIN",
                    provider="SEED",
                )
            )
    db.session.commit()
