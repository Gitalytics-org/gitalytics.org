#!/usr/bin/python3
# -*- coding=utf-8 -*-
r"""

"""
import httpx
from database import createLocalSession, models as dbm
from logging_helpers import add_error_logging
from .update_repository import update_repository
from .gitprovider import get_remote_repositories


@add_error_logging(reraise_exception=False)
def update_session_repositories(session_id: int):
    with createLocalSession() as connection:
        session = connection.query(dbm.Session).filter(dbm.Session.id == session_id).one()
        for remote_repository in get_remote_repositories(session=session):
            update_repository(remote_repository=remote_repository, session=session, database_connection=connection)
        if not session.is_initialized:
            session.is_initialized = True
            connection.commit()
