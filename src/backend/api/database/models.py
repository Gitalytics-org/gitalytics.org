#!/usr/bin/python3
# -*- coding=utf-8 -*-
r"""

"""
import sqlalchemy as sql
from .db import Base as BaseModel


class Workspace(BaseModel):
    __tablename__ = "workspace"

    id = sql.Column(sql.Integer, primary_key=True, autoincrement=True)
    name = sql.Column(sql.String(255), nullable=False)

    def __repr__(self) -> str:
        return f"Workspace {self.id} with the name '{self.name}'"

class Repository(BaseModel):
    __tablename__ = "repository"

    id = sql.Column(sql.Integer, primary_key=True, autoincrement=True)
    name = sql.Column(sql.String(255), nullable=False)

class DayActivity(BaseModel):
    __tablename__ = "day_activity"

    id = sql.Column(sql.Integer, primary_key=True, autoincrement=True)


    




