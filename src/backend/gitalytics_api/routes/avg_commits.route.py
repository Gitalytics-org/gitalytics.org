#!/usr/bin/python3
# -*- coding=utf-8 -*-
r"""

"""
import fastapi
import sqlalchemy as sql
import sqlalchemy.orm
from database import createLocalSession, models as dbm


router = fastapi.APIRouter()


def getCommitCountSubquery(connection: sql.orm.Session):
    return connection \
        .query(sql.func.count().label("count"),
               dbm.Commit.committed_at.label("date")) \
        .group_by(sql.func.extract("year", dbm.Commit.committed_at),
                  sql.func.extract("month", dbm.Commit.committed_at),
                  sql.func.extract("day", dbm.Commit.committed_at)) \
        .subquery()


@router.get("/avg-commits-per-hour")
async def getAvgPerHour():
    with createLocalSession() as connection:
        subquery = getCommitCountSubquery(connection=connection)

        stats = connection \
            .query((sql.func.sum(subquery.c.count) / 24).label("avg"),
                   sql.func.extract("hour", subquery.c.date).label("hour")) \
            .group_by(sql.func.extract("hour", subquery.c.date)) \
            .all()

    return {row.hour: row.avg for row in stats}


@router.get("/avg-commits-per-weekday")
async def getAvgPerWeekday():
    r"""
    please note:
        weekday of 0 means sunday
    """

    with createLocalSession() as connection:
        subquery = getCommitCountSubquery(connection=connection)

        # 'dow' == day-of-week
        stats = connection \
            .query((sql.func.sum(subquery.c.count) / 7).label("avg"),
                   sql.func.extract("dow", subquery.c.date).label("weekday")) \
            .group_by(sql.func.extract("dow", subquery.c.date)) \
            .all()

    # could add to convert 0=sunday to 0=monday (wd - 1) % 7
    # but not because of https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getDay
    return {row.weekday: row.avg for row in stats}


@router.get("/avg-commits-per-day")
async def getAvgPerWeekday():
    with createLocalSession() as connection:
        subquery = getCommitCountSubquery(connection=connection)

        stats = connection \
            .query((sql.func.sum(subquery.c.count) / 31).label("avg"),
                   sql.func.extract("day", subquery.c.date).label("day")) \
            .group_by(sql.func.extract("day", subquery.c.date)) \
            .all()

    return {row.day: row.avg for row in stats}


@router.get("/avg-commits-per-week")
async def getAvgPerWeekday():
    with createLocalSession() as connection:
        subquery = getCommitCountSubquery(connection=connection)

        stats = connection \
            .query((sql.func.sum(subquery.c.count) / 52).label("avg"),
                   sql.func.extract("week", subquery.c.date).label("week")) \
            .group_by(sql.func.extract("week", subquery.c.date)) \
            .all()

    return {row.week: row.avg for row in stats}


@router.get("/avg-commits-per-month")
async def getAvgPerWeekday():
    with createLocalSession() as connection:
        subquery = getCommitCountSubquery(connection=connection)

        stats = connection \
            .query((sql.func.sum(subquery.c.count) / 12).label("avg"),
                   sql.func.extract("month", subquery.c.date).label("month")) \
            .group_by(sql.func.extract("month", subquery.c.date)) \
            .all()

    return {row.month: row.avg for row in stats}
