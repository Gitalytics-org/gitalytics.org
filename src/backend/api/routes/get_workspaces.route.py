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

class ResponseModel(pydantic.BaseModel):
    workspaces: typing.List[Workspace]

    class Config:
        orm_mode = True
        arbitrary_types_allowed = True


@router.get("/get-workspaces", response_model=ResponseModel)
async def create_workspace():
    r"""
    test the creation of a workspace
    """
    with createLocalSession() as session:
        workspaces = session.query(Workspace).select()
    
        

    return {"workspaces": workspaces}
