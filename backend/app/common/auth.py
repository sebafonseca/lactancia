from functools import wraps
from flask_jwt_extended import verify_jwt_in_request, get_jwt


ROLE_ADMIN = "ADMIN"
ROLE_DEV_ADMIN = "DEV_ADMIN"
ROLE_CLIENT = "CLIENT"


def require_roles(*roles):
    def decorator(fn):
        @wraps(fn)
        def wrapper(*args, **kwargs):
            verify_jwt_in_request()
            claims = get_jwt()
            role = claims.get("role")
            allowed_roles = set(roles)
            if ROLE_ADMIN in allowed_roles:
                allowed_roles.add(ROLE_DEV_ADMIN)
            if role not in allowed_roles:
                return {"error": "forbidden"}, 403
            return fn(*args, **kwargs)

        return wrapper

    return decorator
