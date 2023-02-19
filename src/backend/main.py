#!/usr/bin/python3
# -*- coding=utf-8 -*-
r"""

"""
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


# def run_gitporter():
#     from gitporter import update_all
#     update_all()


parser = argparse.ArgumentParser(formatter_class=argparse.ArgumentDefaultsHelpFormatter)
parser.add_argument('-v', '--version', action="version", version=__version__)

subparsers = parser.add_subparsers(title="command", required=True)

createDatabaseParser = subparsers.add_parser("create-database", formatter_class=argparse.ArgumentDefaultsHelpFormatter)
createDatabaseParser.set_defaults(function=create_database)

generateKeyParser = subparsers.add_parser("generate-key", formatter_class=argparse.ArgumentDefaultsHelpFormatter)
generateKeyParser.set_defaults(function=generate_key)

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

# runGitPorterParser = subparsers.add_parser("gitporter", formatter_class=argparse.ArgumentDefaultsHelpFormatter)
# runGitPorterParser.set_defaults(function=run_gitporter)

if __name__ == '__main__':
    args = vars(parser.parse_args())
    args.pop('function')(**args)
