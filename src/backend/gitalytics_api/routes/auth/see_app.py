#!/usr/bin/python3
# -*- coding=utf-8 -*-
r"""

"""
import fastapi
from gitalytics_env import env


router = fastapi.APIRouter()


@router.get("/auth/see-app")
async def app_page_redirect():
    r"""
    here the user can see our app and revoke access
    """
    # TODO: update between GitHub, Bitbucket and GitLab
    return fastapi.responses.RedirectResponse(
        url=f"https://github.com/settings/connections/applications/{env.GITHUB_CLIENT_ID}"
    )
