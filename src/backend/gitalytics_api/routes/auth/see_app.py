#!/usr/bin/python3
# -*- coding=utf-8 -*-
r"""

"""
import fastapi
from gitalytics_env import env
from database import models as dbm, GitPlatform
from gitalytics_api.cookies import session_from_cookies


router = fastapi.APIRouter()


@router.get("/auth/see-app")
async def app_page_redirect(session: dbm.Session = session_from_cookies):
    r"""
    Here, the user can see our app and revoke access on his Git provider-platform.
    """
    # TODO: update between GitHub, Bitbucket and GitLab
    match session.platform:
        case GitPlatform.GITHUB:
            url = f"https://github.com/settings/connections/applications/{env.GITHUB_CLIENT_ID}"
        case _:
            raise fastapi.HTTPException(fastapi.status.HTTP_501_NOT_IMPLEMENTED)
    return fastapi.responses.RedirectResponse(url=url)
