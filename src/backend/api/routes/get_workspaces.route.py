#!/usr/bin/python3
# -*- coding=utf-8 -*-
r"""

"""
import typing
import fastapi
import pydantic
from api.database.models import Workspace
from api.database.db import createLocalSession


router = fastapi.APIRouter()


class WorkspaceViewModel(pydantic.BaseModel):
    id: int
    name: str

    class Config:
        orm_mode = True


class ResponseModel(pydantic.BaseModel):
    workspaces: typing.List[WorkspaceViewModel]


@router.get("/get-workspaces", response_model=ResponseModel)
async def create_workspace():
    r"""
    list all workspaces in the database
    """
    with createLocalSession() as session:
        workspaces = session.query(Workspace).all()
    
    return {"workspaces": workspaces}
