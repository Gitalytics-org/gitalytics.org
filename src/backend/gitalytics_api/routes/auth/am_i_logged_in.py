#!/usr/bin/python3
# -*- coding=utf-8 -*-
r"""

"""
import fastapi
import pydantic
from gitalytics_api.cookies import EncryptedCookieStorage, CookieKey


router = fastapi.APIRouter()


class ResponseModel(pydantic.BaseModel):
    answer: bool


@router.get("/auth/am-i-logged-in", response_model=ResponseModel)
async def amILoggedIn(storage: EncryptedCookieStorage = EncryptedCookieStorage):
    return {
        "answer": True if storage.contains(CookieKey.SESSION_ID) else False
    }
