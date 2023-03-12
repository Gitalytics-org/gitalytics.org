#!/usr/bin/python3
# -*- coding=utf-8 -*-
r"""

"""
import typing as t
import fastapi
import pydantic
from gitalytics_api.cookies import session_from_cookies
from database import models as dbm


router = fastapi.APIRouter()


class ResponseModel(pydantic.BaseModel):
    is_ready: t.Literal[True]


@router.get("/is-session-ready", response_model=ResponseModel, responses={425: {}})
def is_session_ready(
        session: dbm.Session = session_from_cookies
):
    if not session.is_initialized:
        raise fastapi.HTTPException(fastapi.status.HTTP_425_TOO_EARLY)
    return {"is_ready": True}
