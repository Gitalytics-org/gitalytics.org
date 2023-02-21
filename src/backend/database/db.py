#!/usr/bin/python3
# -*- coding=utf-8 -*-
r"""

"""
import sqlalchemy as sql
import sqlalchemy.orm

SQLALCHEMY_DATABASE_URL = "sqlite:///./gitalytics.db"
# SQLALCHEMY_DATABASE_URL = "postgresql://user:password@postgresserver/db"

engine = sql.create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False},
    echo=True,  # set to False for less output
)

class DatabaseSession(sql.orm.Session):
    def __enter__(self) -> sql.orm.Session:
        return super().__enter__()

def createLocalSession() -> DatabaseSession:
    return DatabaseSession(bind=engine)

BaseModel = sql.orm.declarative_base()

def createDatabase():
    # creates tables if not exists
    BaseModel.metadata.create_all(bind=engine)
