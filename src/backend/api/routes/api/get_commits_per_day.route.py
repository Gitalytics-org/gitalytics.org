#!/usr/bin/python3
# -*- coding=utf-8 -*-
r"""

"""
import fastapi
import pydantic
from api.database.models import Repository, Commit
from api.database.db import createLocalSession
from sqlalchemy import select, func
from sqlalchemy.sql import extract

router = fastapi.APIRouter()

class ResponseModel(pydantic.BaseModel):
    commits_per_day: dict[str, int]


@router.get("/commits_per_day/{workspace_id}/{year}", response_model=ResponseModel)
async def get_commits_per_day(workspace_id: int, year: int):
    r"""
    get commits per day in the workspace from a specific year
    """
    with createLocalSession() as connection:

        commits_per_day = connection.query(func.date(Commit.committed_at), func.count())\
            .group_by(func.date(Commit.committed_at))\
            .join(Repository.commits)\
            .filter(Repository.workspace_id == workspace_id)\
            .filter(extract('year', Commit.committed_at) == year)\
            .all()


    return {"commits_per_day": commits_per_day}
