# Imagen de producción para Railway (u otro host que inyecte PORT).
FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . ./

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV FLASK_APP=wsgi:app

# Railway asigna PORT en runtime.
EXPOSE 5000
CMD ["sh", "-c", "exec gunicorn wsgi:app --bind 0.0.0.0:${PORT:-5000} --workers 2 --threads 2 --timeout 120"]
