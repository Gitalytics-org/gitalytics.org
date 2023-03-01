from database import createLocalSession, models as dbm

def update_all_workspaces():
    r"""
    TODO: ignore workspaces with sessions older than 30 days
    """
    print("Sorry, this function is not yet implemented")
    with createLocalSession() as session:
        for workspace in session.query(dbm.Workspace):
            pass # TODO: update by going through sessions
            # update_workspace(workspace_name=workspace.name, platform=workspace.platform)
