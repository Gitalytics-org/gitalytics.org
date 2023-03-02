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


@router.put("/set-active-workspace", response_model=ResponseModel)
async def set_active_workspace(workspace_name: str, cookie_storage: EncryptedCookieStorage = EncryptedCookieStorage, session: dbm.Session = session_from_cookies):
    r"""
    sets the active workspace for a user's session
    """
    with createLocalSession() as connection:
        workspace: t.List[dbm.Workspace] = connection.query(dbm.Workspace) \
            .select_from(dbm.Session) \
            .join(dbm.Repository, dbm.Session.repositories) \
            .join(dbm.Workspace) \
            .filter(dbm.Session.id == session.id) \
            .filter(dbm.Workspace.name == workspace_name) \
            .one_or_none()
    
    if workspace is None:
        raise fastapi.HTTPException(fastapi.status.HTTP_406_NOT_ACCEPTABLE)
    
    cookie_storage.set(key=CookieKey.ACTIVE_WORKSPACE_ID, value=workspace.id)
    return ResponseModel()
