#!/usr/bin/python3
# -*- coding=utf-8 -*-
r"""

"""
import fastapi
import pydantic
from gitalytics_api.common import SessionStorage


router = fastapi.APIRouter()


class ResponseModel(pydantic.BaseModel):
    answer: bool


@router.get("/auth/am-i-logged-in", response_model=ResponseModel)
async def amILoggedIn(storage: SessionStorage = fastapi.Depends(SessionStorage)):
    return {
        "answer": True if storage.get("session-id", default=None) else False
    }
