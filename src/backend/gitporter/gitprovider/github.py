#!/usr/bin/python3
# -*- coding=utf-8 -*-
r"""

f"https://api.github.com/orgs/{workspace}/repos" #TODO: organisation urls github
"""
import typing as t
import httpx
from .common import RepositoryInfo


def getRepositoryList(workspace: str) -> t.List[RepositoryInfo]:
    response = httpx.get(f"https://api.github.com/users/{workspace}/repos")
    response.raise_for_status()
    data: t.List[GithubRepoListResponse] = response.json()

    return [RepositoryInfo(repository_name=repo['name'], clone_url=repo['clone_url']) for repo in data]


class GithubRepoListResponse(t.TypedDict):
    name: str
    full_name: str
    git_url: str
    ssh_url: str
    clone_url: str
