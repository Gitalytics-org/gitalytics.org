#!/usr/bin/python3
# -*- coding=utf-8 -*-
r"""

"""
import typing as t
import fastapi
import pydantic
import database.models as dbm
from database.db import createLocalSession
from gitalytics_api.common import SessionToken, EncryptedCookieStorage
from gitalytics_api.enums import CookieKey


router = fastapi.APIRouter()


class Workspace(pydantic.BaseModel):
    name: str
    logo_url: str | None

    class Config:
        orm_mode = True

class ResponseModel(pydantic.BaseModel):
    active_workspace: Workspace
    other_workspaces: t.List[Workspace]



@router.get("/get-workspaces", response_model=ResponseModel)
async def get_workspaces(session: dbm.Session = SessionToken, cookie_storage: EncryptedCookieStorage = EncryptedCookieStorage):
    r"""
    list all workspaces for the current user (session)
    """
    with createLocalSession() as connection:
        workspaces: t.List[dbm.Workspace] = connection.query(dbm.Workspace) \
            .select_from(dbm.Session) \
            .join(dbm.Repository, dbm.Session.repositories) \
            .join(dbm.Workspace) \
            .filter(dbm.Session.id == session.id) \
            .all()
    
    if cookie_storage.contains(CookieKey.ACTIVE_WORKSPACE_NAME):
        active_workspace_name = cookie_storage.get(CookieKey.ACTIVE_WORKSPACE_NAME)
        for i, workspace in enumerate(workspaces):
            if workspace.name == active_workspace_name:
                other_workspaces = workspaces.copy()
                active_workspace = other_workspaces.pop(i)
                return {
                    "active_workspace": active_workspace,
                    "other_workspaces": other_workspaces,
                }
    
    cookie_storage.set(key=CookieKey.ACTIVE_WORKSPACE_NAME, value=workspaces[0].name)

    return {
        "active_workspace": workspaces[0],
        "other_workspaces": workspaces[1:],
    }
