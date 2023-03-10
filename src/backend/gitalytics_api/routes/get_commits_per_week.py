import sqlalchemy as sql
import fastapi
from database import models as dbm
from gitalytics_api import get_database_connection, active_workspace_id

router = fastapi.APIRouter()

@router.get("/commits-per-week")
async def get_commits_per_week(
        connection: sql.orm.Session = get_database_connection,
        workspace_id: int = active_workspace_id,
        year: int = fastapi.Query(gt=0),
):
    repos = connection\
        .query(dbm.Repository.id)\
        .filter(dbm.Repository.workspace_id == workspace_id)
    stats = connection \
        .query(sql.func.count().label("count"),
               sql.func.extract("week", dbm.Commit.committed_at).label("week")) \
        .filter(dbm.Commit.repository_id.in_(repos),
                sql.func.extract("year", dbm.Commit.committed_at) == year) \
        .group_by(sql.func.extract("week", dbm.Commit.committed_at)) \
        .all()

    return {row.week: row.count for row in stats}
