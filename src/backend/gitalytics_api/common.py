#!/usr/bin/python3
# -*- coding=utf-8 -*-
r"""

"""
import json
import typing as t
import httpx
import fastapi
import pydantic
from cryptography.fernet import Fernet
from database import createLocalSession, models as dbm
from .enums import CookieKey


class Settings(pydantic.BaseSettings):
    COOKIE_KEY: str


settings = Settings()


@fastapi.Depends
def SessionToken(request: fastapi.Request) -> dbm.Session:
    r"""
    requires and loads the secret session-key from the cookies
    important: no validation

    @router.get("/")
    async def endpoint(token: SessionKey):
        pass
    """
    fernet = Fernet(settings.COOKIE_KEY)
    try:
        token = request.cookies[CookieKey.SESSION_ID.value]
    except KeyError:
        raise fastapi.HTTPException(fastapi.status.HTTP_401_UNAUTHORIZED)
    session_id: int = json.loads(fernet.decrypt(token.encode()).decode())

    with createLocalSession() as connection:
        session = connection \
            .query(dbm.Session) \
            .filter(dbm.Session.id == session_id) \
            .one_or_none()

    if not session:
        raise fastapi.HTTPException(fastapi.status.HTTP_401_UNAUTHORIZED)

    return session


@fastapi.Depends
class EncryptedCookieStorage:
    r"""
    usage:

    @router.get("/")
    async def endpoint(, cookie_storage: EncryptedCookieStorage = EncryptedCookieStorage):
        pass
    """

    def __init__(self, request: fastapi.Request, response: fastapi.Response):
        self._fernet = Fernet(settings.COOKIE_KEY)
        self._request = request
        self._response = response

    def to_redirect_response(self, url: str):
        return fastapi.responses.RedirectResponse(url, headers=self._response.headers)
    
    def contains(self, key: CookieKey) -> bool:
        return key.value in self._request.cookies

    def get(self, key: CookieKey, *, default=...):
        try:
            token: str = self._request.cookies[key.value]
        except KeyError:
            if isinstance(default, type(Ellipsis)):
                raise
            return default
        else:
            return json.loads(self._fernet.decrypt(token.encode()).decode())

    def set(self, key: CookieKey, value):
        value = json.dumps(value)
        token = self._fernet.encrypt(value.encode())
        self._response.set_cookie(key.value, token.decode(), max_age=2592000000, secure=True, httponly=True)

    def delete(self, key: CookieKey):
        self._response.delete_cookie(key.value, secure=True, httponly=True)


class HttpxBearerAuth(httpx.Auth):
    """
    Allows the 'auth' argument to be passed as a (username, password) pair,
    and uses HTTP Basic authentication.
    """

    def __init__(self, bearer: str):
        self._auth_header = f"Bearer {bearer}"

    def auth_flow(self, request: httpx.Request) -> t.Generator[httpx.Request, httpx.Response, None]:
        request.headers["Authorization"] = self._auth_header
        yield request
