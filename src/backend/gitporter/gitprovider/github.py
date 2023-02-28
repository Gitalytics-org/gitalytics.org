#!/usr/bin/python3
# -*- coding=utf-8 -*-
r"""

f"https://api.github.com/orgs/{workspace}/repos" #TODO: organisation urls github
"""
import typing as t
import httpx
from .common import RemoteRepositoryInformation


class GithubRepoListResponse(t.TypedDict):
    name: str
    full_name: str
    git_url: str
    ssh_url: str
    clone_url: str

def get_remote_repositories(workspace: str) -> t.List[RemoteRepositoryInformation]:
    response = httpx.get(f"https://api.github.com/users/{workspace}/repos")
    response.raise_for_status()
    github_repositories: t.List[GithubRepoListResponse] = response.json()

    return [RemoteRepositoryInformation(repository_name=repo['name'], clone_url=repo['clone_url']) for repo in github_repositories]
