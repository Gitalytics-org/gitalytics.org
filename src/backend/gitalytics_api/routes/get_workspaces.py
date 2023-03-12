#!/usr/bin/python3
# -*- coding=utf-8 -*-
r"""

"""
import typing as t
import fastapi
import pydantic
from database import DatabaseSession, models as dbm
from database.enums import GitPlatform
from gitalytics_api import session_from_cookies, EncryptedCookieStorage, get_encrypted_cookie_storage, \
    get_database_connection
from gitalytics_api.enums import CookieKey


router = fastapi.APIRouter()


class Workspace(pydantic.BaseModel):
    name: str
    logo_url: str | None
    platform: GitPlatform

    class Config:
        orm_mode = True


class ResponseModel(pydantic.BaseModel):
    active_workspace: Workspace
    other_workspaces: t.List[Workspace]


@router.get("/get-workspaces", response_model=ResponseModel)
async def get_workspaces(
        db_connection: DatabaseSession = get_database_connection,
        session: dbm.Session = session_from_cookies,
        cookie_storage: EncryptedCookieStorage = get_encrypted_cookie_storage,
):
    r"""
    list all workspaces for the current user (session)
    """
    workspaces: t.List[dbm.Workspace] = db_connection \
        .query(dbm.Workspace) \
        .select_from(dbm.Session) \
        .join(dbm.Repository, dbm.Session.repositories) \
        .join(dbm.Workspace) \
        .filter(dbm.Session.id == session.id) \
        .all()

    if len(workspaces) == 0:
        raise fastapi.HTTPException(fastapi.status.HTTP_425_TOO_EARLY)

    if CookieKey.ACTIVE_WORKSPACE_ID in cookie_storage:
        active_workspace_id = cookie_storage[CookieKey.ACTIVE_WORKSPACE_ID]
        for i, workspace in enumerate(workspaces):
            if workspace.id == active_workspace_id:
                other_workspaces = workspaces.copy()
                active_workspace = other_workspaces.pop(i)
                return {
                    "active_workspace": active_workspace,
                    "other_workspaces": other_workspaces,
                }

    cookie_storage[CookieKey.ACTIVE_WORKSPACE_ID] = workspaces[0].id

    return {
        "active_workspace": workspaces[0],
        "other_workspaces": workspaces[1:],
    }
