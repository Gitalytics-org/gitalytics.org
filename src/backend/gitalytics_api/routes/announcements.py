#!/usr/bin/python3
# -*- coding=utf-8 -*-
r"""

"""
import os.path as p
import datetime
import typing as t
import fastapi
import pydantic
from gitalytics_api.util import simple_endpoint_cache
try:
    import orjson as jsonlib
except ModuleNotFoundError:
    import json as jsonlib


router = fastapi.APIRouter()


class Announcement(pydantic.BaseModel):
    title: str
    message: str
    timestamp: t.Optional[datetime.date]


@router.get("/announcements", response_model=t.List[Announcement])
@simple_endpoint_cache()
async def get_announcements():
    if not p.isfile("announcements.json"):
        return []
    else:
        with open("announcements.json", 'r') as file:
            return jsonlib.loads(file.read())
