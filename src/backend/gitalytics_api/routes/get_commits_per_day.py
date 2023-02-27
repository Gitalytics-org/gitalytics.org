#!/usr/bin/python3
# -*- coding=utf-8 -*-
r"""

"""
import fastapi
import pydantic
from database import models as dbm
from database.db import createLocalConnection
import sqlalchemy as sql


router = fastapi.APIRouter()


class ResponseModel(pydantic.BaseModel):
    commits_per_day: dict[str, int]


@router.get("/commits_per_day/", response_model=ResponseModel)
async def get_commits_per_day(workspace_id: int, year: int):
    r"""
    get commits per day in the workspace from a specific year
    """
    with createLocalConnection() as connection:
        commits_per_day = connection.query(sql.func.date(dbm.Commit.committed_at), sql.func.count()) \
            .group_by(sql.func.date(dbm.Commit.committed_at)) \
            .join(dbm.Repository.commits) \
            .filter(dbm.Repository.workspace_id == workspace_id) \
            .filter(sql.func.extract('year', dbm.Commit.committed_at) == year) \
            .all()

    return {"commits_per_day": commits_per_day}
