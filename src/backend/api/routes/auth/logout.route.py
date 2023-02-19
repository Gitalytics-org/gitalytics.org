#!/usr/bin/python3
# -*- coding=utf-8 -*-
r"""

"""
import fastapi
from api.common import SessionStorage


router = fastapi.APIRouter(prefix="/auth")


@router.get("/logout")
async def logout(storage: SessionStorage = fastapi.Depends(SessionStorage)):
    storage.delete("session-id")
    return storage.toRedirectResponse("/")
