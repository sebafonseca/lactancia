from flask import Flask
from dotenv import load_dotenv
from .config import Config
from .extensions import db, migrate, jwt, cors
from .seed import seed_admins


def create_app():
    load_dotenv()
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    cors.init_app(app, resources={r"/*": {"origins": app.config["CORS_ORIGINS"]}})

    from .auth.routes import auth_bp
    from .users.routes import users_bp
    from .appointments.routes import appointments_bp
    from .availability.routes import availability_bp
    from .cases.routes import cases_bp
    from .content.routes import content_bp
    from .payments.routes import payments_bp
    from .devadmin.routes import devadmin_bp
    from .contact.routes import contact_bp

    app.register_blueprint(auth_bp, url_prefix="/auth")
    app.register_blueprint(users_bp, url_prefix="/")
    app.register_blueprint(appointments_bp, url_prefix="/appointments")
    app.register_blueprint(availability_bp, url_prefix="/availability")
    app.register_blueprint(cases_bp, url_prefix="/cases")
    app.register_blueprint(content_bp, url_prefix="/content")
    app.register_blueprint(payments_bp, url_prefix="/payments")
    app.register_blueprint(devadmin_bp, url_prefix="/dev-admin")
    app.register_blueprint(contact_bp, url_prefix="/contact")

    @app.get("/health")
    def public_health():
        """Sin auth — usado por Railway u otros healthchecks."""
        return {"status": "ok"}, 200

    @app.cli.command("seed-admins")
    def seed_admins_command():
        seed_admins(app.config.get("DEV_ADMIN_EMAIL"), app.config.get("ADMIN_EMAIL"))

    return app
