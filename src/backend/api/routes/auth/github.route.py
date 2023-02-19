#!/usr/bin/python3
# -*- coding=utf-8 -*-
r"""

"""
import typing as t
import urllib.parse as urlparse
# import secrets
import fastapi
import pydantic
import httpx
from api.common import SessionStorage, SessionToken
from api.database import createLocalSession, models as dbm
from api.database.enums import GitPlatform


class AuthSettings(pydantic.BaseSettings):
    GITHUB_CLIENT_ID: str
    GITHUB_CLIENT_SECRET: str

    class Config:
        env_file = ".env"


SCOPES = [
    "read:user",
    "repo:status",
]


class GithubResponse(pydantic.BaseModel):
    access_token: str
    scope: str
    token_type: t.Literal["bearer"]


class GithubErrorResponse(pydantic.BaseModel):
    error: str
    error_description: str
    error_uri: str


settings = AuthSettings()
router = fastapi.APIRouter(prefix="/auth/github")


@router.get("/login", status_code=fastapi.status.HTTP_307_TEMPORARY_REDIRECT,
            response_class=fastapi.responses.RedirectResponse)
async def login_redirect(request: fastapi.Request):
    r"""
    redirects to the Github login-page
    """
    try:
        SessionToken.dependency(request=request)
    except fastapi.HTTPException:
        pass  # not existing or wrong token
    else:
        return fastapi.responses.RedirectResponse(url="/#/app")
    # state = secrets.token_hex()
    params = dict(
        client_id=settings.GITHUB_CLIENT_ID,
        scope=",".join(SCOPES),
        # state=state
    )
    urlbase = "https://github.com/login/oauth/authorize"
    url = f"{urlbase}?{urlparse.urlencode(params)}"
    return fastapi.responses.RedirectResponse(url=url)


@router.get("/verify", status_code=fastapi.status.HTTP_307_TEMPORARY_REDIRECT,
            response_class=fastapi.responses.RedirectResponse,
            responses={
                fastapi.status.HTTP_400_BAD_REQUEST: {}
            })
async def verify(code: str, storage: SessionStorage = fastapi.Depends(SessionStorage)):
    r"""
    redirect point for
    """
    # https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}

    params = dict(
        client_id=settings.GITHUB_CLIENT_ID,
        client_secret=settings.GITHUB_CLIENT_SECRET,
        code=code,
    )
    urlbase = "https://github.com/login/oauth/access_token"

    async with httpx.AsyncClient() as client:
        response = await client.post(
            urlbase,
            params=params,
            headers={
                "Accept": "application/json"
            }
        )
        response.raise_for_status()
        data = response.json()

    try:
        data = GithubResponse(**data)
    except pydantic.ValidationError:
        raise fastapi.HTTPException(fastapi.status.HTTP_400_BAD_REQUEST, detail=data.get("error_description"))

    with createLocalSession() as connection:

        session = connection\
            .query(dbm.Session)\
            .filter(dbm.Session.access_token == data.access_token)\
            .one_or_none()
        if session is None:
            session = dbm.Session(
                access_token=data.access_token,
                refresh_token=None,
                platform=GitPlatform.GITHUB
            )
            connection.add(session)
            connection.commit()
            connection.refresh(session)
        storage.set("session-id", session.id)

    return storage.toRedirectResponse(url="/#/app")
