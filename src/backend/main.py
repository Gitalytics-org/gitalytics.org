#!/usr/bin/python3
# -*- coding=utf-8 -*-
r"""

"""
from runconfig import args


if __name__ == '__main__':
    if args.create_database:
        from database.db import createDatabase
        createDatabase()
    if args.generate_key:
        from cryptography.fernet import Fernet
        print(Fernet.generate_key().decode())
    else:
        import uvicorn
        uvicorn.run("api:app", host=args.host, port=args.port, reload=args.reload, workers=args.workers)
