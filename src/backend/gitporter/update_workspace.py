from database import createLocalSession, DatabaseSession, models as dbm
from database.enums import GitPlatform
from .gitprovider import get_remote_repositories
from .repository_actions import update_repository, initialize_repository

def update_workspace(workspace_name: str, platform: GitPlatform):
    with createLocalSession() as session:
        workspace = session.query(dbm.Workspace) \
            .filter(dbm.Workspace.name == workspace_name,
                    dbm.Workspace.platform == platform) \
            .one_or_none()
        if workspace is None:
            workspace = dbm.Workspace(name=workspace_name, platform=platform)
            session.add(workspace)
        update_repositories_in_workspace(workspace=workspace, platform=platform, session=session)

def update_repositories_in_workspace(workspace: dbm.Workspace, platform: GitPlatform, session: DatabaseSession):
    for remote_repository in get_remote_repositories(platform=platform, workspace=workspace.name):
        exists_in_databse = bool(session.query(dbm.Repository) \
                        .filter(dbm.Repository.name == remote_repository.repository_name,
                                dbm.Repository.workspace == workspace) \
                        .one_or_none())
        if exists_in_databse:
            update_repository(workspace=workspace, remote_repository=remote_repository, session=session)
        else:
            initialize_repository(workspace=workspace, remote_repository=remote_repository, session=session)
