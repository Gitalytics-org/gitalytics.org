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


def dunno_round(num: int) -> int:
    nstr = str(num)
    return int(nstr[0] + "0"*(len(nstr)-1))


@router.get("/gitalytics-stats")
async def getGitalyticsStats():
    with createLocalSession() as connection:
        total_workspaces = connection.query(dbm.Workspace).count()
        total_repositories = connection.query(dbm.Repository).count()
        total_commits = connection.query(dbm.Commit).count()

    return dict(
        total_workspaces=dunno_round(total_workspaces),
        total_repositories=dunno_round(total_repositories),
        total_commits=dunno_round(total_commits),
    )
