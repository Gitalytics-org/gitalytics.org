#!/usr/bin/python3
# -*- coding=utf-8 -*-
r"""

"""
import typing
import fastapi
import pydantic
from api.database.models import Repository, Commit
from api.database.db import createLocalSession

router = fastapi.APIRouter()

#class CommitViewModel(pydantic.BaseModel):
#    id: int
#    name: str
#
#    class Config:
#        orm_mode = True

#class ResponseModel(pydantic.BaseModel):
#    commits: list[CommitViewModel]

@router.get("/get-commits")
async def get_commits():
    r"""
    list all workspaces in the database
    """
    with createLocalSession() as session:
        commits = session.query(Commit)
    
    return {"commits": commits}
