#!/usr/bin/python3
# -*- coding=utf-8 -*-
r"""

"""
import typing
import fastapi
import pydantic
from database.models import Workspace
from database.db import createLocalConnection


router = fastapi.APIRouter()


class ResponseModel(pydantic.BaseModel):
    status: typing.Literal["success"]


@router.get("/new-workspace/{workspace_name}", response_model=ResponseModel)
async def create_workspace(workspace_name: str):
    with createLocalConnection() as session:
        new_workspace = Workspace(name=workspace_name)

        session.add(new_workspace)
        session.commit()

    return {"status": "success"}
