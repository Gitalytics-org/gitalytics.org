from database import createLocalSession, models as dbm
from .update_session_repositories import update_session_repositories
from datetime import datetime, timedelta


def update_all_workspaces():
    r"""
    TODO: ignore workspaces with sessions older than 30 days
    """
    with createLocalSession() as connection:
        recent_sessions_query = connection.query(dbm.Session) \
            .filter(dbm.Session.is_initialized,
                    dbm.Session.last_seen > (datetime.today() - timedelta(days=30)))
        for session in recent_sessions_query:
            update_session_repositories(session_id=session.id)
