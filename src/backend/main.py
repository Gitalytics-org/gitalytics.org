#!/usr/bin/python3
# -*- coding=utf-8 -*-
r"""

"""
import sys
import argparse
import logging
from __version__ import __version__
import logconfig  # noqa
import gitporter


def create_database():
    from database.db import createDatabase
    createDatabase()


def generate_key():
    import dotenv
    from cryptography.fernet import Fernet

    dotenv_file = dotenv.find_dotenv()
    dotenv.set_key(dotenv_file, "COOKIE_KEY", Fernet.generate_key().decode())
    print("Successfully generated new COOKIE_KEY ✅")


def run_server(appname: str, host: str, port: int, reload: bool, workers: int):
    import uvicorn
    uvicorn.run(f"gitalytics_api:{appname}", host=host, port=port, reload=reload, workers=workers, log_config=None)


# master parser
parser = argparse.ArgumentParser(formatter_class=argparse.ArgumentDefaultsHelpFormatter)
parser.add_argument('-v', '--version', action="version", version=__version__)

# subparser registerer
subparsers = parser.add_subparsers(title="command", required=True)

# create-database
createDatabaseParser = subparsers.add_parser("create-database", formatter_class=argparse.ArgumentDefaultsHelpFormatter)
createDatabaseParser.set_defaults(function=create_database)

# generate-key
generateKeyParser = subparsers.add_parser("generate-key", formatter_class=argparse.ArgumentDefaultsHelpFormatter)
generateKeyParser.set_defaults(function=generate_key)

# run-server
runServerParser = subparsers.add_parser("run-server", formatter_class=argparse.ArgumentDefaultsHelpFormatter)
runServerParser.set_defaults(function=run_server)
runServerParser.add_argument("--api", action="store_const", dest="appname", const="api", default="app",
                             help="disable static file service and only run the api")
runServerParser.add_argument("--global", action="store_const", dest="host", const="0.0.0.0", default="127.0.0.1",
                             help="make this api available in the local network")
runServerParser.add_argument("-p", "--port", type=int, default=8000,
                             help="port to bind to")
runServerParser.add_argument("--reload", action="store_true", default=False,
                             help="automatically reload after changes")
runServerParser.add_argument("-w", "--workers", type=int,
                             help="number of workers (for production)")

# gitporter subparser register
runGitPorterParser = subparsers.add_parser("gitporter", formatter_class=argparse.ArgumentDefaultsHelpFormatter)
gitPorterSubparsers = runGitPorterParser.add_subparsers(title="subcommand", required=True)

# gitporter update-all
gpUpdateAllParser = gitPorterSubparsers.add_parser("update-all", formatter_class=argparse.ArgumentDefaultsHelpFormatter)
gpUpdateAllParser.set_defaults(function=gitporter.update_all_workspaces)

# gitporter update-workspace
gpUpdateWorkspaceParser = gitPorterSubparsers.add_parser("update-session-repos",
                                                         formatter_class=argparse.ArgumentDefaultsHelpFormatter)
gpUpdateWorkspaceParser.set_defaults(function=gitporter.update_session_repositories)
gpUpdateWorkspaceParser.add_argument('-s', '--session-id', required=True,
                                     help="session id, for wich the repos should be updated",
                                     type=int)

if __name__ == '__main__':
    args = vars(parser.parse_args())
    logging.warning("Starting main.py")  # logging.warning to also show in warning.log that a new run was initiated
    logging.info(f"Starting with args: {args}")
    sys.exit(args.pop('function')(**args))
