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

from pprint import pprint


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


settings = AuthSettings()
router = fastapi.APIRouter(prefix="/auth/github")


@router.get("/login")
async def login_redirect():
    r"""
    redirects to the Github login-page
    """
    # state = secrets.token_hex()
    params = dict(
        client_id=settings.GITHUB_CLIENT_ID,
        scope=",".join(SCOPES),
        # state=state
    )
    urlbase = "https://github.com/login/oauth/authorize"
    url = f"{urlbase}?{urlparse.urlencode(params)}"
    return fastapi.responses.RedirectResponse(
        url=url,
    )


@router.get("/verify")
async def verify(code: str):
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
        raise fastapi.HTTPException(fastapi.status.HTTP_400_BAD_REQUEST)

    pprint(data)

    return fastapi.responses.RedirectResponse(
        url="/",
    )
