#!/usr/bin/python3
# -*- coding=utf-8 -*-
r"""

"""
import typing as t
import fastapi
import pydantic
import sqlalchemy as sql
import sqlalchemy.orm
from database import models as dbm
from database.db import createLocalSession
from gitalytics_api.cookies import active_workspace_id


router = fastapi.APIRouter()


@fastapi.Depends
def get_database_connection():
    db = createLocalSession()
    try:
        yield db
    finally:
        db.close()


@router.get("/commits-per-day", response_model=t.Dict[str, int])
async def get_commits_per_day(
        connection: sql.orm.Session = get_database_connection,
        workspace_id: int = active_workspace_id,
        year: int = fastapi.Query()
):
    r"""
    get commits per day in the workspace from a specific year
    """
    repos = connection.query(dbm.Repository.id).filter(dbm.Repository.workspace_id == workspace_id)
    commits = connection.query(dbm.Commit.id).filter(dbm.Commit.repository_id.in_(repos))
    result = connection \
        .query(sql.func.count().label("count"),
               sql.func.strftime("%Y-%m-%d", dbm.Commit.committed_at).label("date")) \
        .filter(dbm.Commit.id.in_(commits),
                sql.func.extract("year", dbm.Commit.committed_at) == year) \
        .group_by(sql.func.strftime("%Y-%m-%d", dbm.Commit.committed_at)) \
        .all()

    return {row.date: row.count for row in result}
