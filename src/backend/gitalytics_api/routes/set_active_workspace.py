#!/usr/bin/python3
# -*- coding=utf-8 -*-
r"""

"""
import typing as t
import fastapi
import pydantic
import database.models as dbm
from database.db import DatabaseSession
from gitalytics_api import session_from_cookies, EncryptedCookieStorage, get_encrypted_cookie_storage, \
    get_database_connection
from gitalytics_api.enums import CookieKey


router = fastapi.APIRouter()


class ResponseModel(pydantic.BaseModel):
    status: t.Literal["success"] = "success"


@router.put("/set-active-workspace", response_model=ResponseModel)
async def set_active_workspace(
        workspace_name: str,
        cookie_storage: EncryptedCookieStorage = get_encrypted_cookie_storage,
        session: dbm.Session = session_from_cookies,
        db_connection: DatabaseSession = get_database_connection,
):
    r"""
    sets the active workspace for a user's session
    """
    workspace: dbm.Workspace = db_connection \
        .query(dbm.Workspace) \
        .select_from(dbm.Session) \
        .join(dbm.Repository, dbm.Session.repositories) \
        .join(dbm.Workspace) \
        .filter(dbm.Session.id == session.id) \
        .filter(dbm.Workspace.name == workspace_name) \
        .one_or_none()

    if workspace is None:
        raise fastapi.HTTPException(fastapi.status.HTTP_406_NOT_ACCEPTABLE)

    cookie_storage[CookieKey.ACTIVE_WORKSPACE_ID] = workspace.id

    return {}
