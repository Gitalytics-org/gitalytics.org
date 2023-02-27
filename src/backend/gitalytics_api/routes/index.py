#!/usr/bin/python3
# -*- coding=utf-8 -*-
r"""

"""
import typing
import fastapi
import pydantic


router = fastapi.APIRouter()


class ResponseModel(pydantic.BaseModel):
    Hello: typing.Literal["World"]


@router.get("/", response_model=ResponseModel)
async def index():
    r"""
    description for the automatic documentation
    """
    return {"Hello": "World"}
