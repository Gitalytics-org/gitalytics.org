import fastapi
import pydantic
import typing as t
import sqlalchemy as sql
from database import models as dbm, createLocalSession
from gitalytics_api import session_from_cookies, active_workspace_id

router = fastapi.APIRouter()

class ResponseModel(pydantic.BaseModel):
    active_years: t.List[int]

@router.get("/get-active-years", response_model=ResponseModel )
async def get_active_years(session: dbm.Session = session_from_cookies, active_workspace_id: int = active_workspace_id):
    with createLocalSession() as connection:
        active_years_result: t.List[t.Tuple[int]] = connection \
            .query(sql.func.extract("year", dbm.Commit.committed_at)) \
            .select_from(dbm.Session) \
            .join(dbm.Repository, dbm.Session.repositories) \
            .join(dbm.Commit, dbm.Repository.commits) \
            .join(dbm.Workspace, dbm.Repository.workspace) \
            .filter(dbm.Session.id == session.id) \
            .filter(dbm.Workspace.id == active_workspace_id) \
            .group_by(sql.func.extract("year", dbm.Commit.committed_at)) \
            .all()
    active_years = [result_row[0] for result_row in active_years_result]
    return {"active_years": active_years}
