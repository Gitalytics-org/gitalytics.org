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
    dotenv.set_key(dotenv_file, "APP_COOKIE_KEY", Fernet.generate_key().decode())
    print("Successfully generated new COOKIE_KEY ✅")


def run_server():
    import uvicorn
    from gitalytics_env import env

    uvicorn.run(
        "gitalytics_api:app",
        host=env.APP_HOSTNAME,
        port=env.APP_PORT,
        reload=env.APP_RELOAD_ON_FILE_CHANGE,
        workers=env.APP_WORKER_THREADS,
        log_config=None,
    )


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
