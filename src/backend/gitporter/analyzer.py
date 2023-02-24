#!/usr/bin/python3
# -*- coding=utf-8 -*-
r"""

"""
__credits__ = ["KOLO, RORIWA"]
__version_info__ = (0, 0, 1)
__version__ = '.'.join(str(_) for _ in __version_info__)
__maintainer__ = "KOLO, RORIWA"
__status__ = "Prototype"  # Prototype, Development, Production

import functools
from datetime import datetime
from database import createLocalSession, DatabaseSession, models as dbm
from database.enums import GitPlatform
from .gitprovider import getRepositoryList as get_remote_repositories, RepositoryInfo as RemoteRepositoryInformation
from .output_analyzer import parseLog
from .git_command import get_full_git_log, get_git_log_after_commit


def update_all_workspaces():
    r"""
    TODO: ignore workspaces with sessions older than 30 days
    """
    with createLocalSession() as session:
        for workspace in session.query(dbm.Workspace):
            update_workspace(workspace_name=workspace.name, workspace_platform=workspace.platform)


def update_workspace(workspace_name: str, platform: GitPlatform):
    with createLocalSession() as session:
        workspace = session.query(dbm.Workspace) \
            .filter(dbm.Workspace.name == workspace_name,
                    dbm.Workspace.platform == platform) \
            .one_or_none()
        if workspace is None:
            workspace = dbm.Workspace(name=workspace_name, platform=platform)
            session.add(workspace)
        for remote_repository in get_remote_repositories(platform=platform, workspace=workspace_name):
            exists_in_databse = bool(session.query(dbm.Repository) \
                         .filter(dbm.Repository.name == remote_repository.repository_name,
                                 dbm.Repository.workspace == workspace) \
                         .one_or_none())
            if exists_in_databse:
                update_repository(workspace=workspace, remote_repository=remote_repository, session=session)
            else:
                initialize_repository(workspace=workspace, remote_repository=remote_repository, session=session)


def update_repository(workspace: dbm.Workspace, remote_repository: RemoteRepositoryInformation, session: DatabaseSession):
    repository: dbm.Repository = session.query(dbm.Repository) \
        .filter(dbm.Repository.name == remote_repository.repository_name,
                dbm.Repository.workspace == workspace) \
        .one()
    
    log = get_git_log_after_commit(clone_url=remote_repository.clone_url, last_commit_hash=repository.last_commit_hash)
    if log is None:
        return
    
    for commit in parseLog(log):
        obj = dbm.Commit(
            committed_at=commit.committed_at,
            files_modified=commit.files_changed,
            lines_added=commit.lines_inserted,
            lines_removed=commit.lines_deleted,
            repository_id=repository.id,
            author=get_or_create_author(name=commit.author_name, email=commit.email, session=session),
        )
        session.add(obj)
    repository.last_commit_hash = commit.hash
    session.commit()


def initialize_repository(workspace: dbm.Workspace, remote_repository: RemoteRepositoryInformation, session: DatabaseSession):
    repository = dbm.Repository(
        name=remote_repository.repository_name,
        workspace_id=workspace.id,
    )

    log = get_full_git_log(clone_url=remote_repository.clone_url)
    if log is None:
        session.add(repository)
        session.commit()
        return

    for commit in parseLog(log):
        obj = dbm.Commit(
            committed_at=commit.committed_at,
            files_modified=commit.files_changed,
            lines_added=commit.lines_inserted,
            lines_removed=commit.lines_deleted,
            repository=repository,
            author=get_or_create_author(name=commit.author_name, email=commit.email, session=session),
        )
        session.add(obj)
    repository.last_commit_hash = commit.hash
    session.add(repository)
    session.commit()


@functools.lru_cache(maxsize=50)
def get_or_create_author(name: str, email: str, session: DatabaseSession) -> dbm.Author:
    author: dbm.Author|None = session.query(dbm.Author) \
        .filter(dbm.Author.name == name,
                dbm.Author.email == email) \
        .one_or_none()

    if author is not None:
        return author

    author = dbm.Author(
        name=name,
        email=email
    )
    session.add(author)
    return author
