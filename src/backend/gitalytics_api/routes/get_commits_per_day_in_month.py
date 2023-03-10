import sqlalchemy as sql
import fastapi
from database import models as dbm, DatabaseSession
from gitalytics_api import get_database_connection, active_workspace_id, session_from_cookies


router = fastapi.APIRouter()

@router.get("/commits-per-day-in-month")
async def get_commits_per_day_in_month(
        connection: DatabaseSession = get_database_connection,
        session: dbm.Session = session_from_cookies,
        workspace_id: int = active_workspace_id,
        year: int = fastapi.Query(gt=0),
):
    stats = connection \
        .query(sql.func.extract("day", dbm.Commit.committed_at).label("day"),
               sql.func.count().label("count")) \
        .select_from(dbm.Session) \
        .join(dbm.Repository) \
        .join(dbm.Commit) \
        .filter(dbm.Session.id == session.id) \
        .filter(dbm.Repository.workspace_id == workspace_id) \
        .filter(sql.func.extract("year", dbm.Commit.committed_at) == year) \
        .group_by(sql.func.extract("day", dbm.Commit.committed_at)) \
        .all()

    return {row.day: row.count for row in stats}
