#!/usr/bin/python3
# -*- coding=utf-8 -*-
r"""

"""
import json
import datetime
import fastapi
from cryptography.fernet import Fernet
from database import createLocalSession, models as dbm
from .enums import CookieKey
from gitalytics_env import env


@fastapi.Depends
class EncryptedCookieStorage:
    r"""
    @router.get("/")
    async def endpoint(, cookie_storage: EncryptedCookieStorage = EncryptedCookieStorage):
        if CookieKey.SOME_KEY not in cookie_storage:
            # do something
        cookie_storage[CookieKey.SOME_KEY] = "foobar"
    """

    def __init__(self, request: fastapi.Request, response: fastapi.Response):
        self._fernet = Fernet(env.APP_COOKIE_KEY)
        self._request = request
        self._response = response

    def to_redirect_response(self, url: str):
        return fastapi.responses.RedirectResponse(url, headers=self._response.headers)
    
    def __contains__(self, key: CookieKey) -> bool:
        return key.value in self._request.cookies

    def __getitem__(self, key: CookieKey):
        encrypted: str = self._request.cookies[key.value]
        json_string: str = self._fernet.decrypt(encrypted.encode()).decode()
        return json.loads(json_string)

    # def get(self, key: CookieKey, *, default=None):
    #     try:
    #         return self[key]
    #     except KeyError:
    #         return default

    def __setitem__(self, key: CookieKey, value):
        json_string = json.dumps(value)
        encrypted = self._fernet.encrypt(json_string.encode()).decode()
        self._response.set_cookie(key.value, encrypted, max_age=2592000000, secure=True, httponly=True)

    def __delitem__(self, key: CookieKey):
        self._response.delete_cookie(key.value, secure=True, httponly=True)


@fastapi.Depends
def session_from_cookies(cookie_storage: EncryptedCookieStorage = EncryptedCookieStorage) -> dbm.Session:
    r"""
    requires and loads the secret session-key from the cookies
    important: filter by this session when accessing the Database

    @router.get("/")
    async def endpoint(token: dbm.Session = session_from_cookies):
        pass
    """
    if CookieKey.SESSION_ID not in cookie_storage:
        raise fastapi.HTTPException(fastapi.status.HTTP_401_UNAUTHORIZED)

    with createLocalSession() as connection:
        session = connection \
            .query(dbm.Session) \
            .filter(dbm.Session.id == cookie_storage[CookieKey.SESSION_ID]) \
            .one_or_none()

        if session is None:
            raise fastapi.HTTPException(fastapi.status.HTTP_401_UNAUTHORIZED)

        today = datetime.date.today()
        if session.last_seen < today:
            session.last_seen = today
            connection.commit()

        yield session


@fastapi.Depends
def active_workspace_id(cookie_storage: EncryptedCookieStorage = EncryptedCookieStorage) -> int:
    try:
        return cookie_storage[CookieKey.ACTIVE_WORKSPACE_ID]
    except KeyError:
        # raise fastapi.HTTPException(fastapi.status.HTTP_424_FAILED_DEPENDENCY, detail="no active workspace selected")
        pass

    try:
        session_id = cookie_storage[CookieKey.SESSION_ID]
    except KeyError:
        raise fastapi.HTTPException(fastapi.status.HTTP_401_UNAUTHORIZED)

    with createLocalSession() as connection:
        workspace_id: int | None = connection.query(dbm.Workspace.id) \
            .select_from(dbm.Session) \
            .join(dbm.Repository, dbm.Session.repositories) \
            .join(dbm.Workspace) \
            .filter(dbm.Session.id == session_id) \
            .limit(1) \
            .scalar()

    if workspace_id is None:
        raise fastapi.HTTPException(fastapi.status.HTTP_425_TOO_EARLY)

    cookie_storage[CookieKey.ACTIVE_WORKSPACE_ID] = workspace_id
    return workspace_id
