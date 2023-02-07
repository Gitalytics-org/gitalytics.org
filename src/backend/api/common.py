#!/usr/bin/python3
# -*- coding=utf-8 -*-
r"""

"""
import typing as t
import httpx
import fastapi
import pydantic
from cryptography.fernet import Fernet


class Settings(pydantic.BaseSettings):
    # required: base64.urlsafe_b64encode(os.urandom(32))  # equal to Fernet.generate_key()
    COOKIE_KEY = "rs1eV0lf1Aj9UtzvGnZwagXa6sIrQ5o-ModEXznySQI="  # TODO: set ENV-Variable in production


settings = Settings()


@fastapi.Depends
def SessionToken(request: fastapi.Request) -> str:
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
            return self._fernet.decrypt(token.encode()).decode()

    def set(self, key: str, value: str):
        token = self._fernet.encrypt(value.encode())
        self._response.set_cookie(key, token.decode())

    def delete(self, key: str):
        self._response.delete_cookie(key)


class BearerAuth(httpx.Auth):
    """
    Allows the 'auth' argument to be passed as a (username, password) pair,
    and uses HTTP Basic authentication.
    """

    def __init__(self, bearer: str):
        self._auth_header = f"Bearer {bearer}"

    def auth_flow(self, request: httpx.Request) -> t.Generator[httpx.Request, httpx.Response, None]:
        request.headers["Authorization"] = self._auth_header
        yield request
