#!/usr/bin/python3
# -*- coding=utf-8 -*-
r"""

"""
import sqlalchemy as sql
from .db import Base as BaseModel
from .model_components import IdMixin as Id, TimestampMixin as Timestamps
from .enums import GitPlattform


class Workspace(Id, Timestamps, BaseModel):
    __tablename__ = "workspace"

    name = sql.Column(sql.String, nullable=False)
    plattform = sql.Column(sql.Enum(GitPlattform), nullable=False)

class Repository(Id, Timestamps, BaseModel):
    __tablename__ = "repository"

    name = sql.Column(sql.String(255), nullable=False)

class DayActivity(Id, Timestamps, BaseModel):
    __tablename__ = "day_activity"

    day = sql.Column(sql.Date, nullable=False)



    




