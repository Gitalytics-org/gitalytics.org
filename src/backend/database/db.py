#!/usr/bin/python3
# -*- coding=utf-8 -*-
r"""

"""
import sqlalchemy as sql
import sqlalchemy.orm
import sqlalchemy.ext.asyncio


SQLALCHEMY_DATABASE_URL = "sqlite:///./gitalytics.db"
SQLALCHEMY_ASYNC_DATABASE_URL = "sqlite+aiosqlite:///./gitalytics.db"
# SQLALCHEMY_DATABASE_URL = "postgresql://user:password@postgresserver/db"

engine = sql.create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False},
    echo=False,  # set to False for less output
)
async_engine = sql.ext.asyncio.create_async_engine(
    SQLALCHEMY_ASYNC_DATABASE_URL,
    future=True, echo=False
)


class DatabaseSession(sql.orm.Session):
    def __enter__(self) -> sql.orm.Session:
        return super().__enter__()


class DatabaseAsyncSession(sql.ext.asyncio.AsyncSession):
    async def __aenter__(self) -> sql.ext.asyncio.AsyncSession:
        return await super().__aenter__()


def createLocalConnection() -> DatabaseSession:
    return DatabaseSession(bind=engine)


def createLocalAsyncConnection() -> DatabaseAsyncSession:
    return DatabaseAsyncSession(bind=async_engine)


BaseModel = sql.orm.declarative_base()


def createDatabase():
    # creates tables if not exists
    BaseModel.metadata.create_all(bind=engine)
