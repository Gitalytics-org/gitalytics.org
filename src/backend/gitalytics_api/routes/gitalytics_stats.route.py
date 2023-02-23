#!/usr/bin/python3
# -*- coding=utf-8 -*-
r"""

"""
import fastapi
import pydantic
from database import createLocalSession, models as dbm


router = fastapi.APIRouter()


class ResponseViewModel(pydantic.BaseModel):
    total_workspaces: int
    total_repositories: int
    total_commits: int


@router.get("/gitalytics-stats")
async def getGitalyticsStats():
    with createLocalSession() as connection:
        total_workspaces = connection.query(dbm.Workspace).count()
        total_repositories = connection.query(dbm.Repository).count()
        total_commits = connection.query(dbm.Commit).count()

    return dict(
        total_workspaces=total_workspaces,
        total_repositories=total_repositories,
        total_commits=total_commits
    )
