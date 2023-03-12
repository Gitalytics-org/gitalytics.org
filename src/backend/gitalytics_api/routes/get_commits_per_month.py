import fastapi
import sqlalchemy as sql
import typing as t
from database import models as dbm, DatabaseSession
from gitalytics_api import get_active_workspace_id, get_database_connection, session_from_cookies


router = fastapi.APIRouter()


@router.get("/commits-per-month", response_model=t.Dict[int, int])
async def get_commits_per_month(
        connection: DatabaseSession = get_database_connection,
        session: dbm.Session = session_from_cookies,
        workspace_id: int = get_active_workspace_id,
        year: int = fastapi.Query(gt=0),
):
    result: t.List[sql.Row] = connection \
        .query(sql.func.extract("month", dbm.Commit.committed_at).label("month"),
               sql.func.count().label("commit_count")) \
        .select_from(dbm.Session) \
        .join(dbm.Repository, dbm.Session.repositories) \
        .join(dbm.Commit, dbm.Repository.commits) \
        .filter(dbm.Session.id == session.id) \
        .filter(dbm.Repository.workspace_id == workspace_id) \
        .filter(sql.func.extract("year", dbm.Commit.committed_at) == year) \
        .group_by(sql.func.extract("month", dbm.Commit.committed_at)) \
        .all()

    return {row.month: row.commit_count for row in result}
