#!/usr/bin/python3
# -*- coding=utf-8 -*-
r"""

"""
from database import createLocalSession, models as dbm
from database.enums import GitPlatform
import gitporter

uname = input("username (empty for update): ")
if uname:
    with createLocalSession() as session:
        workspace = dbm.Workspace(name=uname, platform=GitPlatform.GITHUB)
        session.add(workspace)
        session.commit()
else:
    gitporter.update_all_workspaces()
