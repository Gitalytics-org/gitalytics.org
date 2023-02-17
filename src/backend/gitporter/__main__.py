#!/usr/bin/python3
# -*- coding=utf-8 -*-
r"""

"""
import argparse
import dataclasses
from .analyzer import update_all, update_workspace


@dataclasses.dataclass
class NameSpace:
    pass


parser = argparse.ArgumentParser(
    description=__doc__,
    formatter_class=argparse.ArgumentDefaultsHelpFormatter
)
parser.add_argument("--help")
# parser.add_argument("--update-all")
# parser.add_argument("--update-workspace")
# parser.add_argument("--update-repository")


if __name__ == '__main__':
    args = parser.parse_args(namespace=NameSpace)
    update_all()
