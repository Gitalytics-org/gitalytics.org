#!/usr/bin/python3
# -*- coding=utf-8 -*-
r"""

"""
import typing as t
from database.enums import GitPlatform
from .common import InfoCollectionError, RepositoryInfo
from . import github
from . import bitbucket
from . import gitlab


provider_dict = {
    GitPlatform.GITHUB: github,
    GitPlatform.BITBUCKET: bitbucket,
    GitPlatform.GITLAB: gitlab
}


def getRepositoryList(platform: GitPlatform, workspace: str) -> t.List[RepositoryInfo]:
    module = provider_dict[platform]
    try:
        return module.getRepositoryList(workspace=workspace)
    except Exception as exc:
        raise InfoCollectionError(f"failed to collect info for {workspace=!r}", original=exc)
