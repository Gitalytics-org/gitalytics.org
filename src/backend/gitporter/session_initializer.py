#!/usr/bin/python3
# -*- coding=utf-8 -*-
r"""

"""
import httpx
from database import createLocalSession, models as dbm
from database.enums import GitPlatform
from gitalytics_api.common import HttpxBearerAuth, add_error_logging
from gitporter import update_workspace
import typing as t


@add_error_logging(reraise_exception=False)
def initialize_session(session_id: int):
    with createLocalSession() as connection:
        session = connection.query(dbm.Session).filter(dbm.Session.id == session_id).one()
        for workspace_name in get_workspace_names(session=session):
            update_workspace(workspace_name=workspace_name, platform=session.platform)

def get_workspace_names(session: dbm.Session) -> t.List[str]:
    match session.platform:
        case GitPlatform.GITHUB:
            return get_workspace_names_from_github(session.access_token)
        case _:
            # TODO: Add other providers
            raise NotImplementedError(f"{session.platform} is not yet supported. (triggered by session id: {session.id})")


def get_workspace_names_from_github(access_token: str) -> t.List[str]:
    # TODO: add recommended headers

    user_response = httpx.get("https://api.github.com/user", auth=HttpxBearerAuth(access_token))
    user_response.raise_for_status()
    user_name = user_response.json()["login"]
    workspace_names = [user_name]

    organizations_response = httpx.get(f"https://api.github.com/users/{user_name}/orgs", auth=HttpxBearerAuth(access_token))
    organizations_response.raise_for_status()
    workspace_names.extend([o["login"] for o in organizations_response.json()])
    return workspace_names
