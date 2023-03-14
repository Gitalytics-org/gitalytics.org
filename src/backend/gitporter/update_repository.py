from database import DatabaseSession, models as dbm
from .gitprovider import RemoteRepositoryInformation
from .git_command import get_full_git_log, get_git_log_after_commit
from .read_log_into_database import read_log_into_database


def update_repository(session: dbm.Session, remote_repository: RemoteRepositoryInformation,
                      database_connection: DatabaseSession):
    workspace = database_connection.query(dbm.Workspace) \
        .filter(dbm.Workspace.name == remote_repository.workspace_name,
                dbm.Workspace.platform == session.platform) \
        .one_or_none()

    if workspace is None:
        workspace = dbm.Workspace(
            name=remote_repository.workspace_name,
            platform=session.platform,
            logo_url=remote_repository.workspace_logo_url,
        )
        database_connection.add(workspace)
        database_connection.commit(workspace)

    repository: dbm.Repository = database_connection.query(dbm.Repository) \
        .filter(dbm.Repository.name == remote_repository.repository_name,
                dbm.Repository.workspace == workspace) \
        .one_or_none()

    if repository is None:
        repository = dbm.Repository(
            name=remote_repository.repository_name,
            workspace_id=workspace.id,
        )
        database_connection.add(repository)
        log = get_full_git_log(clone_url=remote_repository.clone_url)
    else:
        log = get_git_log_after_commit(clone_url=remote_repository.clone_url,
                                       last_commit_hash=repository.last_commit_hash)

    session.repositories.add(repository)
    database_connection.add(session)
    if log is None:
        database_connection.commit()
        return

    read_log_into_database(log=log, repository=repository, session=database_connection)
    database_connection.commit()
