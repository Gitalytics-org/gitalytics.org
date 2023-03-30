#!/usr/bin/python3
# -*- coding=utf-8 -*-
r"""

"""
import hmac
import secrets
import typing as t
import urllib.parse as urlparse
import fastapi
import pydantic
import httpx
from gitalytics_api.cookies import EncryptedCookieStorage, get_encrypted_cookie_storage
from gitalytics_api.enums import CookieKey
from gitalytics_api.exception_util import add_exception_handler
from database import createLocalSession, models as dbm
from database.enums import GitPlatform
from gitporter import update_session_repositories
from gitalytics_env import env


SCOPES = [
    "read:user",
    "repo",
    "read:org",
]


class GithubResponse(pydantic.BaseModel):
    access_token: str
    scope: str
    token_type: t.Literal["bearer"]


class GithubErrorResponse(t.TypedDict):
    error: str
    error_description: str
    error_uri: str


router = fastapi.APIRouter()


@router.get("/auth/github/login",
            status_code=fastapi.status.HTTP_307_TEMPORARY_REDIRECT,
            response_class=fastapi.responses.RedirectResponse)
async def login_redirect(cookie_storage: EncryptedCookieStorage = get_encrypted_cookie_storage):
    r"""
    redirects to the GitHub login-page
    """
    # try:
    #     session_from_cookies.dependency(request=request)
    # except fastapi.HTTPException:
    #     pass  # not existing or wrong token
    # else:
    #     return fastapi.responses.RedirectResponse(url="/#/app")
    state = secrets.token_hex()
    cookie_storage[CookieKey.AUTH_STATE] = state
    url = "https://github.com/login/oauth/authorize"
    params = dict(
        client_id=env.GITHUB_CLIENT_ID,
        scope=",".join(SCOPES),
        state=state,
        allow_signup=False
    )
    return cookie_storage.to_redirect_response(url=url, **params)


def verify_handler(exception: Exception):
    query = dict(
        error="we fucked up badly. maybe try a page-reload and then again",
        detail=f"{fastapi.status.HTTP_500_INTERNAL_SERVER_ERROR}: {exception.__class__.__name__} ({exception})"
    )
    return fastapi.responses.RedirectResponse(
        url=f"/#/login?{urlparse.urlencode(query)}",
    )


@router.get("/auth/github/verify",
            status_code=fastapi.status.HTTP_307_TEMPORARY_REDIRECT,
            response_class=fastapi.responses.RedirectResponse)
# general catch because the user shouldn't see a json-response
@add_exception_handler(ExceptionClass=Exception, handler=verify_handler)
async def verify(tasks: fastapi.BackgroundTasks,
                 code: str = fastapi.Query(),
                 state: str = fastapi.Query(),
                 cookie_storage: EncryptedCookieStorage = get_encrypted_cookie_storage):
    r"""
    callback endpoint from GitHub
    """
    # https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}

    try:
        cookie_state = cookie_storage[CookieKey.AUTH_STATE]
    except KeyError:
        return cookie_storage.to_redirect_response(
            url="/#/login",
            error="your login is corrupted and had to be canceled for security reasons"
        )
    finally:
        del cookie_storage[CookieKey.AUTH_STATE]

    if not hmac.compare_digest(state, cookie_state):
        return cookie_storage.to_redirect_response(
            url="/#/login",
            error="your login is corrupted and had to be canceled for security reasons"
        )

    params = dict(
        client_id=env.GITHUB_CLIENT_ID,
        client_secret=env.GITHUB_CLIENT_SECRET,
        code=code,
    )

    async with httpx.AsyncClient() as client:
        response = await client.post(
            url="https://github.com/login/oauth/access_token",
            params=params,
            headers={
                "Accept": "application/json"
            }
        )
        if not response.is_success:
            return cookie_storage.to_redirect_response(
                url="/#/login",
                error="failed to retrieve auth-key",
                detail=f"{response.status_code}: {response.reason_phrase}",
            )

        response_data = response.json()

    try:
        data = GithubResponse(**response_data)
    except pydantic.ValidationError:
        response_data: GithubErrorResponse
        return cookie_storage.to_redirect_response(
            url="/#/login",
            error="failed to retrieve auth-key",
            detail=response_data['error_description']
        )

    with createLocalSession() as connection:
        session = connection \
            .query(dbm.Session) \
            .filter(dbm.Session.access_token == data.access_token) \
            .one_or_none()
        if session is None:
            session = dbm.Session(
                access_token=data.access_token,
                refresh_token=None,
                platform=GitPlatform.GITHUB,
            )
            connection.add(session)
            connection.commit()
            connection.refresh(session)
        cookie_storage[CookieKey.SESSION_ID] = session.id

    # threading.Thread(
    #     target=update_session_repositories,
    #     name=f"update-session-repositories for {session.id=}",
    #     kwargs=dict(session_id=session.id),
    #     daemon=False,
    # ).start()
    tasks.add_task(update_session_repositories, session_id=session.id)

    return cookie_storage.to_redirect_response(url="/#/app")
