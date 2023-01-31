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


class _MetaSession(sql.orm.Session):
    def __enter__(self) -> sql.orm.Session:
        return super().__enter__()

def createLocalSession() -> _MetaSession:
    return _MetaSession(bind=engine)


Base = sql.orm.declarative_base()

def createDatabase():
    # creates tables if not exists
    Base.metadata.create_all(bind=engine)
