#!/usr/bin/python3
# -*- coding=utf-8 -*-
r"""

"""
import typing as t
import fastapi
import pydantic
from gitalytics_api.common import SessionToken


router = fastapi.APIRouter()


class ResponseModel(pydantic.BaseModel):
    status: t.Literal["success"] = "success"


@router.get("/auth/am-i-logged-in", response_model=ResponseModel)
async def amILoggedIn(_=SessionToken):
    return {}
