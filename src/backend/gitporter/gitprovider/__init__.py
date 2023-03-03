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


def get_remote_repositories(session: dbm.Session) -> t.List[RemoteRepositoryInformation]:
    module = provider_dict[session.platform]
    return module.get_remote_repositories(access_token=session.access_token)
