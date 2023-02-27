#!/usr/bin/python3
# -*- coding=utf-8 -*-
r"""

"""
import fastapi
import sqlalchemy as sql
from database import createLocalAsyncConnection, models as dbm


router = fastapi.APIRouter()


@router.get("/extreme")
async def extremeTesting():
    async with createLocalAsyncConnection() as connection:
        return await connection.execute(sql.select(dbm.Commit))
