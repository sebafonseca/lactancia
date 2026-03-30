from datetime import datetime
from sqlalchemy import func
from ..extensions import db


class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), unique=True, nullable=False)
    name = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(50), nullable=False, default="CLIENT")
    provider = db.Column(db.String(50), nullable=False)
    created_at = db.Column(db.DateTime, default=func.now(), nullable=False)

    appointments = db.relationship("Appointment", back_populates="user")
    case = db.relationship("Case", back_populates="user", uselist=False)


class Appointment(db.Model):
    __tablename__ = "appointments"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    modality = db.Column(db.String(50), nullable=False)  # online / presencial
    datetime = db.Column(db.DateTime, nullable=False)
    duration = db.Column(db.Integer, nullable=False)
    reason = db.Column(db.Text, nullable=True)
    status = db.Column(db.String(50), nullable=False, default="PENDING_PAYMENT")
    location = db.Column(db.String(255), nullable=True)
    meeting_url = db.Column(db.String(255), nullable=True)
    payment_status = db.Column(db.String(50), nullable=False, default="PENDING_PAYMENT")
    created_at = db.Column(db.DateTime, default=func.now(), nullable=False)

    user = db.relationship("User", back_populates="appointments")
    session = db.relationship("Session", back_populates="appointment", uselist=False)


class Availability(db.Model):
    __tablename__ = "availability"

    id = db.Column(db.Integer, primary_key=True)
    modality = db.Column(db.String(50), nullable=False)
    day_of_week = db.Column(db.Integer, nullable=False)  # 0-6
    start_time = db.Column(db.Time, nullable=False)
    end_time = db.Column(db.Time, nullable=False)


class Case(db.Model):
    __tablename__ = "cases"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    status = db.Column(db.String(50), nullable=False, default="ACTIVE")
    created_at = db.Column(db.DateTime, default=func.now(), nullable=False)

    user = db.relationship("User", back_populates="case")
    goals = db.relationship("Goal", back_populates="case", cascade="all, delete-orphan")
    sessions = db.relationship("Session", back_populates="case", cascade="all, delete-orphan")
    tasks = db.relationship("Task", back_populates="case", cascade="all, delete-orphan")


class Goal(db.Model):
    __tablename__ = "goals"

    id = db.Column(db.Integer, primary_key=True)
    case_id = db.Column(db.Integer, db.ForeignKey("cases.id"), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    status = db.Column(db.String(50), nullable=False, default="in_progress")
    created_at = db.Column(db.DateTime, default=func.now(), nullable=False)

    case = db.relationship("Case", back_populates="goals")


class Session(db.Model):
    __tablename__ = "sessions"

    id = db.Column(db.Integer, primary_key=True)
    case_id = db.Column(db.Integer, db.ForeignKey("cases.id"), nullable=False)
    appointment_id = db.Column(db.Integer, db.ForeignKey("appointments.id"), nullable=True)
    notes_public = db.Column(db.Text, nullable=True)
    notes_private = db.Column(db.Text, nullable=True)
    status = db.Column(db.String(50), nullable=False, default="scheduled")
    created_at = db.Column(db.DateTime, default=func.now(), nullable=False)

    case = db.relationship("Case", back_populates="sessions")
    appointment = db.relationship("Appointment", back_populates="session")


class Task(db.Model):
    __tablename__ = "tasks"

    id = db.Column(db.Integer, primary_key=True)
    case_id = db.Column(db.Integer, db.ForeignKey("cases.id"), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    done = db.Column(db.Boolean, default=False, nullable=False)
    created_at = db.Column(db.DateTime, default=func.now(), nullable=False)

    case = db.relationship("Case", back_populates="tasks")


class SuccessCase(db.Model):
    __tablename__ = "success_cases"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    summary = db.Column(db.Text, nullable=False)
    content = db.Column(db.Text, nullable=False)
    published = db.Column(db.Boolean, default=True, nullable=False)
    created_at = db.Column(db.DateTime, default=func.now(), nullable=False)


class FAQ(db.Model):
    __tablename__ = "faqs"

    id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.String(255), nullable=False)
    answer = db.Column(db.Text, nullable=False)
    order = db.Column(db.Integer, default=0, nullable=False)
    published = db.Column(db.Boolean, default=True, nullable=False)
