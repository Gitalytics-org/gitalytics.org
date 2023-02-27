#!/usr/bin/python3
# -*- coding=utf-8 -*-
r"""

"""
import httpx
from database import createLocalSession, models as dbm
from database.enums import GitPlatform
from gitalytics_api.common import HttpxBearerAuth, add_error_logging
from gitporter import update_workspace


@add_error_logging(reraise_exception=False)
def initialize_session(session: dbm.Session):
    workspace_name = getWorkspaceName(session=session)

    with createLocalSession() as connection:
        workspace = connection \
            .query(dbm.Workspace) \
            .filter(dbm.Workspace.platform == session.platform, dbm.Workspace.name == workspace_name) \
            .one_or_none()

    if workspace is not None:
        return None

    update_workspace(workspace_name=workspace_name, platform=session.platform)


def getWorkspaceName(session: dbm.Session) -> str:
    match session.platform:
        case GitPlatform.GITHUB:
            return getWorkspaceNameGitHub(session.access_token)
        # expand with other providers
        case _:
            raise NotImplementedError(f"{getWorkspaceName.__name__} doesn't support {session.platform} yet")


def getWorkspaceNameGitHub(access_token: str) -> str:
    response = httpx.get(f"https://api.github.com/user", auth=HttpxBearerAuth(access_token))
    response.raise_for_status()
    data = response.json()
    return data["login"]
