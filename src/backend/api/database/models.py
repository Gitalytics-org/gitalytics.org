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
    # add many-to-one relationship to Workspace


class DayActivity(Id, Timestamps, BaseModel):
    __tablename__ = "day_activity"

    day = sql.Column(sql.Date, nullable=False)
    commit_count = sql.Column(sql.Integer, nullable=False)
    lines_added = sql.Column(sql.Integer, nullable=False)
    lines_removed = sql.Column(sql.Integer, nullable=False)
    # add many-to-one relationship to Repository
