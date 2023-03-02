#!/usr/bin/python3
# -*- coding=utf-8 -*-
r"""

"""
import json
import typing as t
import functools
import datetime
import httpx
import fastapi
import pydantic
from cryptography.fernet import Fernet
from database import createLocalSession, models as dbm


class Settings(pydantic.BaseSettings):
    COOKIE_KEY: str


settings = Settings()


@fastapi.Depends
def SessionToken(request: fastapi.Request) -> dbm.Session:
    r"""
    requires and loads the secret session-key from the cookies
    important: no validation

    @router.get("/")
    async def endpoint(token: dbm.Session = SessionToken):
        pass
    """
    fernet = Fernet(settings.COOKIE_KEY)
    try:
        token = request.cookies["session-id"]
    except KeyError:
        raise fastapi.HTTPException(fastapi.status.HTTP_401_UNAUTHORIZED)
    session_id: int = json.loads(fernet.decrypt(token.encode()).decode())

    with createLocalSession() as connection:
        session = connection \
            .query(dbm.Session) \
            .filter(dbm.Session.id == session_id) \
            .one_or_none()

        if session is None:
            # maybe redirect to /#/login ('cause seems like session expired)
            raise fastapi.HTTPException(fastapi.status.HTTP_401_UNAUTHORIZED)

        today = datetime.date.today()
        if session.last_seen < today:
            session.last_seen = today
            connection.commit()

    return session


class SessionStorage:
    r"""
    @router.get("/")
    async def endpoint(, session: SessionStorage = Depends(SessionStorage)):
        pass
    """

    def __init__(self, request: fastapi.Request, response: fastapi.Response):
        self._fernet = Fernet(settings.COOKIE_KEY)
        self._request = request
        self._response = response

    def toRedirectResponse(self, url: str):
        return fastapi.responses.RedirectResponse(url, headers=self._response.headers)

    def get(self, key: str, *, default=...):
        try:
            token: str = self._request.cookies[key]
        except KeyError:
            if isinstance(default, type(Ellipsis)):
                raise
            return default
        else:
            return json.loads(self._fernet.decrypt(token.encode()).decode())

    def set(self, key: str, value):
        value = json.dumps(value)
        token = self._fernet.encrypt(value.encode())
        self._response.set_cookie(key, token.decode(), max_age=2592000000, secure=True, httponly=True)

    def delete(self, key: str):
        self._response.delete_cookie(key, secure=True, httponly=True)


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
