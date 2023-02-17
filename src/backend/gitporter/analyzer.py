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
import os.path as p
import shutil
import logging
import tempfile
import git
from datetime import datetime
from database import createLocalSession, models as dbm
from .gitprovider_stuff import getRepositoryList, RepositoryInfo
from .output_analyzer import parseLog


def update_all():
    r"""
    TODO: ignore workspaces with sessions older than 30 days
    """
    with createLocalSession() as session:
        for workspace in session.query(dbm.Workspace):
            try:
                update_workspace(workspace=workspace)
            except Exception as exc:
                logging.error("failed to update workspace", exc_info=exc)


def update_workspace(workspace: dbm.Workspace):
    repositories_infos = getRepositoryList(platform=workspace.platform, workspace=workspace.name)
    with createLocalSession() as session:
        for repository_info in repositories_infos:
            exist = bool(session
                         .query(dbm.Repository.id)
                         .filter(dbm.Repository.name == repository_info.repository_name,
                                 dbm.Repository.workspace_id == workspace.id)
                         .one_or_none())
            if exist:
                repo_update(workspace=workspace, repository_info=repository_info)
            else:
                repo_init(workspace=workspace, repository_info=repository_info)


def repo_update(workspace: dbm.Workspace, repository_info: RepositoryInfo):
    repo_path = tempfile.mktemp(prefix="gitalytics")
    try:
        git_repository = git.Repo.clone_from(
            repository_info.clone_url,
            to_path=repo_path,
            filter="blob:none",
            no_checkout=True
        )

        with createLocalSession() as session:
            repository = session\
                .query(dbm.Repository)\
                .filter(dbm.Repository.name == repository_info.repository_name,
                        dbm.Repository.workspace_id == workspace.id)\
                .one()

            # replace --after with the hash
            log = git_repository.git.log('--shortstat', '--no-merges', '--format=%H;%aI;%an;%ae', "--after", repository.last_refresh.isoformat())
            print("LOG-OUTPUT:")
            print(log)

            for commit in parseLog(log):
                obj = dbm.Commit(
                    committed_at=commit.datetime,
                    files_modified=commit.files_changed,
                    lines_added=commit.lines_inserted,
                    lines_removed=commit.lines_deleted,
                    repository_id=repository.id,
                    author_id=getOrCreateAuthorId(name=commit.author_name, email=commit.email),
                )
                session.add(obj)
            session.commit()

            repository.last_refresh = datetime.now()
    finally:
        if p.isdir(repo_path):
            shutil.rmtree(repo_path)


def repo_init(workspace: dbm.Workspace, repository_info: RepositoryInfo):
    repo_path = tempfile.mktemp(prefix="gitalytics")
    try:
        repository = git.Repo.clone_from(
            repository_info.clone_url,
            to_path=repo_path,
            no_checkout=True
        )

        log = repository.git.log('--shortstat', '--no-merges', '--format=%H;%aI;%an;%ae')

        with createLocalSession() as session:
            repository = dbm.Repository(
                name=repository_info.repository_name,
                workspace_id=workspace.id,
            )
            session.add(repository)
            session.commit()
            session.refresh(repository)

            for commit in parseLog(log):
                obj = dbm.Commit(
                    committed_at=commit.datetime,
                    files_modified=commit.files_changed,
                    lines_added=commit.lines_inserted,
                    lines_removed=commit.lines_deleted,
                    repository_id=repository.id,
                    author_id=getOrCreateAuthorId(name=commit.author_name, email=commit.email),
                )
                session.add(obj)
            session.commit()

            repository.last_refresh = datetime.now()
            session.commit()
    finally:
        if p.isdir(repo_path):
            shutil.rmtree(repo_path)


@functools.lru_cache(maxsize=50)
def getOrCreateAuthorId(name: str, email: str) -> int:
    with createLocalSession() as session:
        author = session.query(dbm.Author) \
            .filter(dbm.Author.name == name,
                    dbm.Author.email == email) \
            .one_or_none()

        if author:
            return author.id

        author = dbm.Author(
            name=name,
            email=email
        )
        session.add(author)
        session.commit()
        session.refresh(author)
        return author.id
