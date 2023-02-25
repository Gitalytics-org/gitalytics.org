from database import createLocalSession, models as dbm
from .update_workspace import update_workspace

def update_all_workspaces():
    r"""
    TODO: ignore workspaces with sessions older than 30 days
    """
    with createLocalSession() as session:
        for workspace in session.query(dbm.Workspace):
            update_workspace(workspace_name=workspace.name, platform=workspace.platform)