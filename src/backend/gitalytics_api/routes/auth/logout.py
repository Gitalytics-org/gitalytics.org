#!/usr/bin/python3
# -*- coding=utf-8 -*-
r"""

"""
import fastapi
from gitalytics_api.common import SessionStorage


router = fastapi.APIRouter(prefix="/auth")


@router.get("/logout")
async def logout(storage: SessionStorage = fastapi.Depends(SessionStorage)):
    r"""
    logout the current user
    """
    storage.delete("session-id")
    return storage.toRedirectResponse("/")
