#!/usr/bin/python3
# -*- coding=utf-8 -*-
r"""

"""
import fastapi


router = fastapi.APIRouter()


@router.get("/avg-per-weekday")
async def getAvgPerWeekday():
    pass


@router.get("/avg-per-day")
async def getAvgPerWeekday():
    pass


@router.get("/avg-per-week")
async def getAvgPerWeekday():
    pass


@router.get("/avg-per-month")
async def getAvgPerWeekday():
    pass
