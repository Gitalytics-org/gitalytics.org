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
from .env_variables import env


@fastapi.Depends
class EncryptedCookieStorage:
    r"""
    usage:

    @router.get("/")
    async def endpoint(, cookie_storage: EncryptedCookieStorage = EncryptedCookieStorage):
        pass
    """

    def __init__(self, request: fastapi.Request, response: fastapi.Response):
        self._fernet = Fernet(env.COOKIE_KEY)
        self._request = request
        self._response = response

    def to_redirect_response(self, url: str):
        return fastapi.responses.RedirectResponse(url, headers=self._response.headers)
    
    def contains(self, key: CookieKey) -> bool:
        return key.value in self._request.cookies

    def __getitem__(self, key: CookieKey):
        encrypted: str = self._request.cookies[key.value]
        json_string: str = self._fernet.decrypt(encrypted.encode()).decode()
        return json.loads(json_string)

    # still open if it should be implemented
    # def __setitem__(self, key: CookieKey, value): ...
    # def __delitem__(self, key: CookieKey): ...
    # def __contains__(self, item: CookieKey): ...

    def get(self, key: CookieKey, *, default=None):
        try:
            return self[key]
        except KeyError:
            return default

    def set(self, key: CookieKey, value):
        json_string = json.dumps(value)
        encrypted = self._fernet.encrypt(json_string.encode()).decode()
        self._response.set_cookie(key.value, encrypted, max_age=2592000000, secure=True, httponly=True)

    def delete(self, key: CookieKey):
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
    try:
        session_id = cookie_storage[CookieKey.SESSION_ID]
    except KeyError:
        raise fastapi.HTTPException(fastapi.status.HTTP_401_UNAUTHORIZED)

    with createLocalSession() as connection:
        session = connection \
            .query(dbm.Session) \
            .filter(dbm.Session.id == session_id) \
            .one_or_none()

        if session is None:
            # maybe redirect to /#/login ('cause seems like session expired) (TODO: implement in frontend)
            raise fastapi.HTTPException(fastapi.status.HTTP_401_UNAUTHORIZED)

        today = datetime.date.today()
        if session.last_seen < today:
            session.last_seen = today
            connection.commit()

    return session
