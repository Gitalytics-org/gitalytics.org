#!/usr/bin/python3
# -*- coding=utf-8 -*-
r"""

"""
import fastapi
from gitalytics_api.common import EncryptedCookieStorage
from gitalytics_api.enums import CookieKey


router = fastapi.APIRouter(prefix="/auth")


@router.get("/logout")
async def logout(cookie_storage: EncryptedCookieStorage = EncryptedCookieStorage):
    r"""
    logout the current user
    """
    cookie_storage.delete(CookieKey.SESSION_ID)
    return cookie_storage.to_redirect_response("/")
