#!/usr/bin/python3
# -*- coding=utf-8 -*-
r"""

"""
import httpx
from database import createLocalSession, models as dbm
from logging_helpers import add_error_logging
from .update_workspace import update_workspace
from .gitprovider import get_workspace_names


@add_error_logging(reraise_exception=False)
def initialize_session(session_id: int):
    with createLocalSession() as connection:
        session = connection.query(dbm.Session).filter(dbm.Session.id == session_id).one()
        for workspace_name in get_workspace_names(session=session):
            update_workspace(workspace_name=workspace_name, platform=session.platform)
