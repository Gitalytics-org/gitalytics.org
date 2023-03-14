import sqlalchemy as sql
import fastapi
import typing as t
import pydantic
from database import models as dbm, DatabaseSession
from gitalytics_api import get_database_connection, get_active_workspace_id, session_from_cookies


router = fastapi.APIRouter()

class ResponseModel(pydantic.BaseModel):
    monday: int = 0
    tuesday: int = 0
    wednesday: int = 0
    thursday: int = 0
    friday: int = 0
    saturday: int = 0
    sunday: int = 0

sql_weekday_map = {
    1: "sunday",
    2: "monday",
    3: "tuesday",
    4: "wednesday",
    5: "thursday",
    6: "friday",
    7: "saturday",
}


@router.get("/commits-per-weekday", response_model=ResponseModel)
async def get_commits_per_weekday(
        connection: DatabaseSession = get_database_connection,
        session: dbm.Session = session_from_cookies,
        workspace_id: int = get_active_workspace_id,
        year: int = fastapi.Query(gt=0),
):
    result: t.List[sql.Row] = connection \
        .query(sql.func.dayofweek(dbm.Commit.committed_at).label("weekday"),
               sql.func.count().label("commit_count")) \
        .select_from(dbm.Session) \
        .join(dbm.Repository, dbm.Session.repositories) \
        .join(dbm.Commit, dbm.Repository.commits) \
        .filter(dbm.Session.id == session.id) \
        .filter(dbm.Repository.workspace_id == workspace_id) \
        .filter(sql.func.extract("year", dbm.Commit.committed_at) == year) \
        .group_by(sql.func.dayofweek(dbm.Commit.committed_at)) \
        .all()

    # but not because of https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getDay
    return {sql_weekday_map[row.weekday]: row.commit_count for row in result}
