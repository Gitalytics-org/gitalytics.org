#!/usr/bin/python3
# -*- coding=utf-8 -*-
r"""

"""
import os
import logging.handlers


LOGGING_PATH = os.path.abspath(
    os.path.join(
        os.path.dirname(__file__),
        'backend-logs'
    )
)
if not os.path.isdir(LOGGING_PATH):
    os.mkdir(LOGGING_PATH)


class WatchFilesFilter(logging.Filter):
    def filter(self, record: logging.LogRecord) -> bool:
        return not record.name.startswith("watchfiles")


fileLoggingHandler = logging.handlers.RotatingFileHandler(
    filename=os.path.join(
        LOGGING_PATH,
        f"gitalytics.log"
    ),
    maxBytes=1024*1024*10,  # roughly 10mb
    backupCount=5,
    delay=True,
)
fileLoggingHandler.addFilter(WatchFilesFilter())

consoleLoggingHandler = logging.StreamHandler()


logging.basicConfig(
    format="{asctime} | {levelname:.3} | {name:20} | {funcName:20} | {message}",
    style="{",
    level=logging.DEBUG,
    handlers=[
        fileLoggingHandler,
        consoleLoggingHandler
    ],
)
