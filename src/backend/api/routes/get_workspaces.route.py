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
        orm_mode: True

class ViewModel(pydantic.BaseModel):
    workspaces: typing.List[WorkspaceViewModel]

    class Config:
        orm_mode: True



@router.get("/get-workspaces", response_model=ViewModel)
async def create_workspace():
    r"""
    test the creation of a workspace
    """
    with createLocalSession() as session:
        workspaces = session.query(Workspace).all()
    
    print(workspaces)

    return {"workspaces": workspaces}
