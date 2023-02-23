import sqlalchemy as sql
from datetime import datetime
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from .db import BaseModel


class TimestampsMixin:
    created_at: Mapped[datetime] = mapped_column(sql.DateTime(timezone=True), server_default=sql.func.now())
    updated_at: Mapped[datetime] = mapped_column(sql.DateTime(timezone=True), server_default=sql.func.now(),
                                                 onupdate=sql.func.now())


class CreatedAtMixin:
    created_at: Mapped[datetime] = mapped_column(sql.DateTime(timezone=True), server_default=sql.func.now())


class IdMixin:
    id: Mapped[int] = mapped_column(sql.Integer, primary_key=True, autoincrement=True)


class BigIdMixin:
    id: Mapped[int] = mapped_column(sql.BigInteger, primary_key=True, autoincrement=True)
