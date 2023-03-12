#!/usr/bin/python3
# -*- coding=utf-8 -*-
r"""

"""
import fastapi
import pydantic
from gitalytics_api.cookies import EncryptedCookieStorage, get_encrypted_cookie_storage, CookieKey


router = fastapi.APIRouter()


class ResponseModel(pydantic.BaseModel):
    answer: bool


@router.get("/auth/am-i-logged-in", response_model=ResponseModel)
async def am_i_logged_in(storage: EncryptedCookieStorage = get_encrypted_cookie_storage):
    return {
        "answer": True if CookieKey.SESSION_ID in storage else False
    }
