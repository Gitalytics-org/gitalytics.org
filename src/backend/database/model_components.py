import sqlalchemy as sql
from .db import BaseModel


class TimestampMixin:
    time_created = sql.Column(sql.DateTime(timezone=True), server_default=sql.func.now())
    time_updated = sql.Column(sql.DateTime(timezone=True), onupdate=sql.func.now())


class IdMixin:
    id = sql.Column(sql.Integer, primary_key=True, autoincrement=True)
