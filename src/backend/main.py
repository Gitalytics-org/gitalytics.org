#!/usr/bin/python3
# -*- coding=utf-8 -*-
r"""

"""
import sys
import argparse
from __version__ import __version__


def create_database():
    from api.database.db import createDatabase
    createDatabase()


def generate_key():
    from cryptography.fernet import Fernet
    print(Fernet.generate_key().decode())


def run_server(host: str, port: int, reload: bool, workers: int):
    import uvicorn
    uvicorn.run("api:app", host=host, port=port, reload=reload, workers=workers)


def run_gitporter_update_all():
    print("update all workspaces")


def run_gitporter_update_workspace(platform: str, workspace: str):
    print("update workspace", [platform, workspace])


# master parser

parser = argparse.ArgumentParser(formatter_class=argparse.ArgumentDefaultsHelpFormatter)
parser.add_argument('-v', '--version', action="version", version=__version__)

# subparser registerer
subparsers = parser.add_subparsers(title="command", required=True)

# basic commands

# create-database

createDatabaseParser = subparsers.add_parser("create-database", formatter_class=argparse.ArgumentDefaultsHelpFormatter)
createDatabaseParser.set_defaults(function=create_database)

# generate-key

generateKeyParser = subparsers.add_parser("generate-key", formatter_class=argparse.ArgumentDefaultsHelpFormatter)
generateKeyParser.set_defaults(function=generate_key)

# run server

runServerParser = subparsers.add_parser("run-server", formatter_class=argparse.ArgumentDefaultsHelpFormatter)
runServerParser.set_defaults(function=run_server)
runServerParser.add_argument("--global", action="store_const", dest="host", const="0.0.0.0", default="127.0.0.1",
                             help="make this api available in the local network")
runServerParser.add_argument("-p", "--port", type=int, default=8000,
                             help="port to bind to")
runServerParser.add_argument("--reload", action="store_true", default=False,
                             help="automatically reload after changes")
runServerParser.add_argument("-w", "--workers", type=int,
                             help="number of workers (for production)")

# gitporter

runGitPorterParser = subparsers.add_parser("gitporter", formatter_class=argparse.ArgumentDefaultsHelpFormatter)

gitPorterSubparsers = runGitPorterParser.add_subparsers(title="subcommand", required=True)

# gitporter update-all
gpUpdateAllParser = gitPorterSubparsers.add_parser("update-all", formatter_class=argparse.ArgumentDefaultsHelpFormatter)
gpUpdateAllParser.set_defaults(function=run_gitporter_update_all)

# gitporter update-workspace
gpUpdateWorkspaceParser = gitPorterSubparsers.add_parser("update-workspace",
                                                         formatter_class=argparse.ArgumentDefaultsHelpFormatter)
gpUpdateWorkspaceParser.set_defaults(function=run_gitporter_update_workspace)
gpUpdateWorkspaceParser.add_argument('platform', help="name of the workspace to update",
                                     choices=["GITHUB", "BITBUCKET", "GITLAB"])
gpUpdateWorkspaceParser.add_argument('workspace', help="git provider")


if __name__ == '__main__':
    args = vars(parser.parse_args())
    sys.exit(args.pop('function')(**args))
