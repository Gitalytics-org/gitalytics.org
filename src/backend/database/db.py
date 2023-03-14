#!/usr/bin/python3
# -*- coding=utf-8 -*-
r"""

"""
import sqlalchemy as sql
import sqlalchemy.orm as orm
from gitalytics_env import env


# SQLALCHEMY_DATABASE_URL = "sqlite:///./gitalytics.db"
database_url = f"mysql+pymysql://{env.MYSQL_USER}:{env.MYSQL_PASSWORD}@{env.APP_HOSTNAME}:3306/{env.MYSQL_DATABASE}"

engine = sql.create_engine(
    database_url,
    pool_pre_ping=True,
    echo=False,  # set to True or False for more or less output respectively
)


class DatabaseSession(orm.Session):
    def __enter__(self) -> sql.orm.Session:
        return super().__enter__()


def createLocalSession() -> DatabaseSession:
    return DatabaseSession(bind=engine)


BaseModel = sql.orm.declarative_base()


def createDatabase():
    # creates tables if not exists
    BaseModel.metadata.create_all(bind=engine)
