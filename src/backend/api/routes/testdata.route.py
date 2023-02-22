#!/usr/bin/python3
# -*- coding=utf-8 -*-
r"""

"""
import datetime
import typing as t
import fastapi
import pydantic
import sqlalchemy as sql
from database import createLocalSession, models as dbm


router = fastapi.APIRouter()


class Response(pydantic.BaseModel):
    count: int
    date: datetime.date

    class Config:
        orm_mode = True


@router.get("/test-data", response_model=t.Dict[datetime.date, int])
async def getTestData():
    with createLocalSession() as session:
        result = session\
            .query(sql.func.date(dbm.Commit.committed_at), sql.func.count()) \
            .group_by(sql.func.date(dbm.Commit.committed_at))\
            .all()

        return {r[0]: r[1] for r in result}
