import os


def _database_url():
    url = os.getenv("DATABASE_URL", "sqlite:///lactancia.db")
    if url.startswith("postgres://"):
        return url.replace("postgres://", "postgresql://", 1)
    return url


def _cors_origins():
    raw = os.getenv("CORS_ORIGINS", "*").strip()
    if not raw or raw == "*":
        return "*"
    origins = [o.strip() for o in raw.split(",") if o.strip()]
    return origins if origins else "*"


class Config:
    SECRET_KEY = os.getenv("SECRET_KEY", "dev-secret")
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "dev-jwt-secret")
    SQLALCHEMY_DATABASE_URI = _database_url()
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    CORS_ORIGINS = _cors_origins()
    ENVIRONMENT = os.getenv("ENVIRONMENT", "development")
    APP_VERSION = os.getenv("APP_VERSION", "0.1.0")
    DEV_ADMIN_EMAIL = os.getenv("DEV_ADMIN_EMAIL")
    ADMIN_EMAIL = os.getenv("ADMIN_EMAIL")
    MERCADOPAGO_ACCESS_TOKEN = os.getenv("MERCADOPAGO_ACCESS_TOKEN", "")
    MERCADOPAGO_WEBHOOK_SECRET = os.getenv("MERCADOPAGO_WEBHOOK_SECRET", "")
    RESEND_API_KEY = os.getenv("RESEND_API_KEY", "")
    RESEND_FROM = os.getenv("RESEND_FROM", "")
    CONTACT_TO = os.getenv("CONTACT_TO", "lactanciasuy@gmail.com")
