from flask import Blueprint, request, current_app
import requests


contact_bp = Blueprint("contact", __name__)


@contact_bp.post("")
def create_contact():
    payload = request.get_json() or {}
    name = payload.get("name")
    email = payload.get("email")
    message = payload.get("message")
    reason = payload.get("reason")
    prefer_whatsapp = payload.get("preferWhatsapp", False)

    if not name or not email or not message:
        return {"error": "name, email y message son requeridos"}, 400

    api_key = current_app.config.get("RESEND_API_KEY")
    from_email = current_app.config.get("RESEND_FROM")
    to_email = current_app.config.get("CONTACT_TO")

    if not api_key or not from_email:
        return {"error": "resend_not_configured"}, 500

    subject = f"Nuevo contacto desde lactancia - {email}"
    body_lines = [
        f"Nombre: {name}",
        f"Email: {email}",
        f"Motivo: {reason or 'No especificado'}",
        f"Prefiere WhatsApp: {'Si' if prefer_whatsapp else 'No'}",
        "",
        "Mensaje:",
        message,
    ]
    body_text = "\n".join(body_lines)

    response = requests.post(
        "https://api.resend.com/emails",
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        },
        json={
            "from": from_email,
            "to": [to_email],
            "subject": subject,
            "text": body_text,
            "reply_to": email,
        },
        timeout=10,
    )

    if response.status_code >= 400:
        return {"error": "email_failed", "details": response.text}, 502

    return {"ok": True}
