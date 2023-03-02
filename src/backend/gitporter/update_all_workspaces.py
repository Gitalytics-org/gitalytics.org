from database import createLocalSession, models as dbm
from .update_session_repositories import update_session_repositories


def update_all_workspaces():
    r"""
    TODO: ignore workspaces with sessions older than 30 days
    """
    with createLocalSession() as connection:
        for session in connection.query(dbm.Session).all():
            update_session_repositories(session_id=session.id)
