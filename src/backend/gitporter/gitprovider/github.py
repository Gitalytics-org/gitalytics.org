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


def get_workspace_names(access_token: str) -> t.List[str]:
    github_headers = {
        "Accept": "application/vnd.github+json", 
        "Authorization": f"Bearer {access_token}", 
        "X-GitHub-Api-Version": "2022-11-28",
        }

    user_response = httpx.get("https://api.github.com/user", headers=github_headers)
    user_response.raise_for_status()
    user_name = user_response.json()["login"]
    workspace_names = [user_name]

    organizations_response = httpx.get(f"https://api.github.com/users/{user_name}/orgs", headers=github_headers)
    organizations_response.raise_for_status()
    workspace_names.extend([o["login"] for o in organizations_response.json()])

    return workspace_names
