#!/usr/bin/python3
# -*- coding=utf-8 -*-
r"""

"""
__credits__ = ["KOLO, RORIWA"]
__version_info__ = (0, 0, 1)
__version__ = '.'.join(str(_) for _ in __version_info__)
__maintainer__ = "KOLO, RORIWA"
__status__ = "Prototype"  # Prototype, Development, Production

from database import DatabaseSession, models as dbm
from .gitprovider import RemoteRepositoryInformation
from .git_command import get_full_git_log, get_git_log_after_commit
from .read_log_into_database import read_log_into_database


def update_repository(workspace: dbm.Workspace, remote_repository: RemoteRepositoryInformation, session: DatabaseSession):
    repository: dbm.Repository = session.query(dbm.Repository) \
        .filter(dbm.Repository.name == remote_repository.repository_name,
                dbm.Repository.workspace == workspace) \
        .one()
    log = get_git_log_after_commit(clone_url=remote_repository.clone_url, last_commit_hash=repository.last_commit_hash)
    if log is None:
        return
    read_log_into_database(log=log, repository=repository, session=session)

def initialize_repository(workspace: dbm.Workspace, remote_repository: RemoteRepositoryInformation, session: DatabaseSession):
    repository = dbm.Repository(
        name=remote_repository.repository_name,
        workspace_id=workspace.id,
    )
    session.add(repository)
    log = get_full_git_log(clone_url=remote_repository.clone_url)
    if log is None:
        session.commit()
        return
    read_log_into_database(log=log, repository=repository, session=session)
