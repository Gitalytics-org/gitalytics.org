#!/usr/bin/python3
# -*- coding=utf-8 -*-
r"""

"""
import typing as t
from database.enums import GitPlatform
from database import models as dbm
from .common import RemoteRepositoryInformation
from . import github
from . import bitbucket
from . import gitlab


provider_dict = {
    GitPlatform.GITHUB: github,
    GitPlatform.BITBUCKET: bitbucket,
    GitPlatform.GITLAB: gitlab
}


def get_remote_repositories(platform: GitPlatform, workspace: str) -> t.List[RemoteRepositoryInformation]:
    module = provider_dict[platform]
    return module.get_remote_repositories(workspace=workspace)

    
def get_workspace_names(session: dbm.Session) -> t.List[str]:
    module = provider_dict[session.platform]
    return module.get_workspace_names(session.access_token)
