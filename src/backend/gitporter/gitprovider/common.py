#!/usr/bin/python3
# -*- coding=utf-8 -*-
r"""

"""
import dataclasses


@dataclasses.dataclass
class RemoteRepositoryInformation:
    repository_name: str
    clone_url: str


class InfoCollectionError(RuntimeError):
    original: Exception

    def __init__(self, *args, original: Exception = None):
        super().__init__(*args)
        self.original = original
