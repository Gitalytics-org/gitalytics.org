#!/usr/bin/python3
# -*- coding=utf-8 -*-
r"""

f"https://api.github.com/orgs/{workspace}/repos" #TODO: organisation urls github
"""
import typing as t
import httpx
from .common import RemoteRepositoryInformation

class GithubRepoItemOwner(t.TypedDict):
    login: str
    avatar_url: str

class GithubRepoItem(t.TypedDict):
    name: str 
    full_name: str
    clone_url: str
    owner: GithubRepoItemOwner

def get_remote_repositories(access_token: str) -> t.List[RemoteRepositoryInformation]:
    github_headers = {
        "Accept": "application/vnd.github+json", 
        "Authorization": f"Bearer {access_token}", 
        "X-GitHub-Api-Version": "2022-11-28",
        }
    
    # TODO pagination. We can get a maximum of 100 repos at the moment
    response = httpx.get("https://api.github.com/user/repos?affiliation=owner,organization_member&per_page=100", headers=github_headers)
    response.raise_for_status()
    github_repositories: t.List[GithubRepoItem] = response.json()
    result = []
    for github_item in github_repositories:
        result.append(
            RemoteRepositoryInformation(
                repository_name=github_item["name"],
                workspace_name=github_item["owner"]["login"],
                clone_url=github_item["clone_url"].replace("https://", f"https://{access_token}@")
            )
        )

    return result
