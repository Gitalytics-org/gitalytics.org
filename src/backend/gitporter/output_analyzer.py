#!/usr/bin/python3
# -*- coding=utf-8 -*-
r"""

"""
import re
import typing
from datetime import datetime
import pydantic


REGEX = r"(?P<hash>[a-z0-9]+);(?P<date>.+);(?P<author>.+);(?P<email>.+)\n\n" \
        r"(?: (?P<changed>\d+) files? changed,?)?" \
        r"(?: (?P<inserted>\d+) insertions?\(\+\),?)?" \
        r"(?: (?P<deleted>\d+) deletions?\(\-\))?"


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


def parseLog(log: str) -> typing.Iterator[ParsedCommit]:
    for match in re.finditer(REGEX, log):
        yield ParsedCommit(**match.groupdict())


if __name__ == '__main__':
    import subprocess
    output = subprocess.check_output(['git', 'log', '--shortstat', '--no-merges', '--format="%H;%aI;%an;%ae"']).decode()
    for commit in parseLog(output):
        print(commit)
