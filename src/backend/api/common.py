#!/usr/bin/python3
# -*- coding=utf-8 -*-
r"""

"""
import fastapi
import pydantic
from cryptography.fernet import Fernet


class Settings(pydantic.BaseSettings):
    COOKIE_KEY = "gitalytics"  # TODO: set ENV-Variable in production


settings = Settings()


@fastapi.Depends
def SessionKey(request: fastapi.Request):
    r"""
    requires and loads the secret session-key from the cookies
    important: no validation

    @router.get("/")
    async def endpoint(token: SessionKey):
        pass
    """
    fernet = Fernet(settings.COOKIE_KEY)
    try:
        token = request.cookies["token"]
    except KeyError:
        raise fastapi.HTTPException(fastapi.status.HTTP_401_UNAUTHORIZED)
    value = fernet.decrypt(token.encode()).decode()
    return value
