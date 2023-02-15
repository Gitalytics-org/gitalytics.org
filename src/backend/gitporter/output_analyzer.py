#!/usr/bin/python3
# -*- coding=utf-8 -*-
__credits__ = ["KOLO, RORIWA"]
__version_info__ = (0, 0, 1)
__version__ = '.'.join(str(_) for _ in __version_info__)
__maintainer__ = "KOLO, RORIWA"
__status__ = "Prototype"  # Prototype, Development, Production
r"""

"""
import re
import typing
from datetime import datetime
import pydantic
import shutil
import os
import tempfile
from git import Repo
import my_logger

REGEX = r"(?P<hash>[a-z0-9]+);(?P<date>.+);(?P<author>.+);(?P<email>.+)\n\n" \
        r"(?: (?P<changed>\d+) files? changed,?)?" \
        r"(?: (?P<inserted>\d+) insertions?\(\+\),?)?" \
        r"(?: (?P<deleted>\d+) deletions?\(\-\))?"
url = "https://github.com/konstantinlob/gitalytics.org"

class ParsedCommit(pydantic.BaseModel):
    hash: str
    author: str
    email: str
    date: datetime
    changed: int
    inserted: int
    deleted: int

    @pydantic.validator('changed', 'inserted', 'deleted', pre=True)
    def validate(cls, value):
        return value or 0

def getLog(cloneUrl):
    repo_path = tempfile.mktemp()

    if os.path.exists(repo_path):
        shutil.rmtree(repo_path)

    repo = Repo.clone_from(
        cloneUrl,
        to_path=repo_path,
        no_checkout=True
    )
    print("repo " +url+ " cloned successfully")

    log = repo.git.log('--shortstat', '--no-merges', '--format=%H;%aI;%an;%ae')

    if os.path.exists(repo_path):
        shutil.rmtree(repo_path)
    return log

def parseLog(log: str) -> typing.Iterator[ParsedCommit]:
    for match in re.finditer(REGEX, log):
        yield ParsedCommit(**match.groupdict())


if __name__ == '__main__':
    my_logger.createLogFilesIfNecessary()
    output=getLog(url)
    for commit in parseLog(output):
        print(commit)
