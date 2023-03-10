#!/usr/bin/python3
# -*- coding=utf-8 -*-
r"""

"""
import typing as t
import fastapi
import sqlalchemy as sql
from datetime import date
from database import models as dbm
from database.db import createLocalSession
from gitalytics_api import active_workspace_id, session_from_cookies, get_database_connection


router = fastapi.APIRouter()

class DatabaseRow(t.TypedDict):
    date: date
    count: int


@router.get("/commits-per-day", response_model=t.Dict[date, int])
async def get_commits_per_day(
        db_connection: sql.orm.Session = get_database_connection,
        session: dbm.Session = session_from_cookies,
        workspace_id: int = active_workspace_id,
        year: int = fastapi.Query()
):
    r"""
    get commits per day in the workspace from a specific year
    """
    result: t.List[DatabaseRow] = db_connection \
        .query(sql.func.cast(dbm.Commit.committed_at, sql.DATE).label("date"), 
               sql.func.count().label("count")) \
        .select_from(dbm.Session) \
        .join(dbm.Repository, dbm.Session.repositories) \
        .join(dbm.Commit, dbm.Repository.commits) \
        .filter(dbm.Session.id == session.id) \
        .filter(dbm.Repository.workspace_id == workspace_id) \
        .filter(sql.extract("year", dbm.Commit.committed_at) == year) \
        .group_by(sql.func.cast(dbm.Commit.committed_at, sql.DATE)) \
        .all()

    return {row.date: row.count for row in result}
