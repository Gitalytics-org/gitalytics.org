#!/usr/bin/python3
# -*- coding=utf-8 -*-
r"""

"""
import json
import typing
import fastapi
import pydantic
from api.database.models import Repository, Commit, Workspace
from api.database.db import createLocalSession
from sqlalchemy import select, func
from sqlalchemy.sql import extract
from datetime import datetime

router = fastapi.APIRouter()

class ResponseModel(pydantic.BaseModel):
    commits_per_day: dict[str, int]

    class Config:
        orm_mode = True

@router.get("/commits_per_day/{workspace_id}/{year}", response_model=ResponseModel)
async def get_commits(workspace_id: int, year: int):
    r"""
    get commits per day in the workspace from a specific year
    """
    with createLocalSession() as connection:
        result = connection.execute(
            select(func.count(), func.date(Commit.committed_at))
            .group_by(func.date(Commit.committed_at))
            .join(Repository.commits)
            .filter(Repository.workspace_id == workspace_id)
            .filter(extract('year', Commit.committed_at) == year)
        ).all()


        commits_per_day = {}
        for row in result:
            print(row)
            commits_per_day[row.date] = row.count


    return {"commits_per_day": commits_per_day}
