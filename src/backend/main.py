#!/usr/bin/python3
# -*- coding=utf-8 -*-
r"""

"""
import uvicorn
from runconfig import args


if __name__ == '__main__':
    uvicorn.run("api:app", host=args.host, port=args.port, reload=args.reload, workers=args.workers)
