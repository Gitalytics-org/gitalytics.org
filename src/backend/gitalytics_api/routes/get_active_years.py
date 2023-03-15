import fastapi
import pydantic
import typing as t
import sqlalchemy as sql
from database import models as dbm, DatabaseSession
from gitalytics_api import session_from_cookies, get_active_workspace_id, get_database_connection


router = fastapi.APIRouter()


class ResponseModel(pydantic.BaseModel):
    active_years: t.List[int]


@router.get("/active-years", response_model=ResponseModel)
async def get_active_years(
        connection: DatabaseSession = get_database_connection,
        session: dbm.Session = session_from_cookies,
        active_workspace_id: int = get_active_workspace_id,
):
    active_years_result: t.List[sql.Row] = connection \
        .query(sql.func.extract("year", dbm.Commit.committed_at)) \
        .select_from(dbm.Session) \
        .join(dbm.Repository, dbm.Session.repositories) \
        .join(dbm.Commit, dbm.Repository.commits) \
        .filter(dbm.Session.id == session.id) \
        .filter(dbm.Repository.workspace_id == active_workspace_id) \
        .distinct() \
        .all()

    active_years = [result_row[0] for result_row in active_years_result]
    return {"active_years": active_years}
