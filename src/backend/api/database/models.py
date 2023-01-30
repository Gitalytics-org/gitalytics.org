#!/usr/bin/python3
# -*- coding=utf-8 -*-
r"""

"""
import sqlalchemy as sql
from .db import Base as BaseModel


class Table(BaseModel):
    __tablename__ = "table-name"

    id = sql.Column(sql.Integer, primary_key=True)
