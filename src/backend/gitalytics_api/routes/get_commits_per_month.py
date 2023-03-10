import fastapi
import sqlalchemy as sql
from database import models as dbm
from gitalytics_api import active_workspace_id, get_database_connection

router = fastapi.APIRouter()

@router.get("/commits-per-month")
async def get_commits_per_month(
        connection: sql.orm.Session = get_database_connection,
        workspace_id: int = active_workspace_id,
        year: int = fastapi.Query(gt=0),
):
    repos = connection\
        .query(dbm.Repository.id)\
        .filter(dbm.Repository.workspace_id == workspace_id)
    stats = connection \
        .query(sql.func.count().label("count"),
               sql.func.extract("month", dbm.Commit.committed_at).label("month")) \
        .filter(dbm.Commit.repository_id.in_(repos),
                sql.func.extract("year", dbm.Commit.committed_at) == year) \
        .group_by(sql.func.extract("month", dbm.Commit.committed_at)) \
        .all()

    return {row.month: row.count for row in stats}
