import sqlalchemy as sql
import fastapi
import typing as t
from database import models as dbm
from gitalytics_api import get_database_connection, active_workspace_id, session_from_cookies

router = fastapi.APIRouter()

class DatabaseRow(t.TypedDict):
    weekday: int
    count: int

@router.get("/commits-per-weekday")
async def get_commits_per_weekday(
        connection: sql.orm.Session = get_database_connection,
        session: dbm.Session = session_from_cookies,
        workspace_id: int = active_workspace_id,
        year: int = fastapi.Query(gt=0),
):
    r"""
    please note:
        weekday of 0 means sunday
    """
    # 'dow' == day-of-week
    stats: t.List[DatabaseRow] = connection \
        .query(sql.func.dayofweek(dbm.Commit.committed_at).label("weekday"),
               sql.func.count().label("count")) \
        .select_from(dbm.Session) \
        .join(dbm.Repository, dbm.Session.repositories) \
        .join(dbm.Commit, dbm.Repository.commits) \
        .filter(dbm.Session.id == session.id) \
        .filter(dbm.Repository.workspace_id == workspace_id) \
        .filter(sql.func.extract("year", dbm.Commit.committed_at) == year) \
        .group_by(sql.func.dayofweek(dbm.Commit.committed_at)) \
        .all()

    # could add to convert 0=sunday to 0=monday (wd - 1) % 7
    # but not because of https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getDay
    return {row.weekday: row.count for row in stats}