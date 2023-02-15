#!/usr/bin/python3
# -*- coding=utf-8 -*-
r"""

"""
import argparse
import dataclasses


@dataclasses.dataclass
class NameSpace:
    pass


parser = argparse.ArgumentParser(
    description=__doc__,
    formatter_class=argparse.ArgumentDefaultsHelpFormatter
)
parser.add_argument("--help")


if __name__ == '__main__':
    args = parser.parse_args(namespace=NameSpace)
    print(args)
