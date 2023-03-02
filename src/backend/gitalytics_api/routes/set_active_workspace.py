#!/usr/bin/python3
# -*- coding=utf-8 -*-
r"""

"""
import typing as t
import fastapi
import pydantic
import database.models as dbm
from database.db import createLocalSession
from gitalytics_api.cookies import session_from_cookies, EncryptedCookieStorage
from gitalytics_api.enums import CookieKey


router = fastapi.APIRouter()


class ResponseModel(pydantic.BaseModel):
    status: str = "success"
    message: str | None = None



@router.put("/set-active-workspace", response_model=ResponseModel)
async def get_workspaces(workspace_name: str, cookie_storage: EncryptedCookieStorage = EncryptedCookieStorage):
    r"""
    list all workspaces for the current user (session)
    """
    
    cookie_storage.set(key=CookieKey.ACTIVE_WORKSPACE_NAME, value=workspace_name)
    return
