#!/usr/bin/python3
# -*- coding=utf-8 -*-
r"""
This file contanis all SQLAlchemy ORM Database models
"""

import sqlalchemy as sql
from sqlalchemy.orm import Mapped, mapped_column, relationship
from .db import BaseModel
from .model_components import IdMixin, BigIdMixin, TimestampsMixin, CreatedAtMixin
from .enums import GitPlattform
from datetime import datetime
from typing import Set


class Workspace(IdMixin, TimestampsMixin, BaseModel):
    __tablename__ = "workspace"

    name: Mapped[str] = mapped_column(sql.String, nullable=False)
    plattform: Mapped[GitPlattform] = mapped_column(sql.Enum(GitPlattform), nullable=False)
    repositories: Mapped[Set["Repository"]] = relationship(back_populates="workspace")


class Author(IdMixin, TimestampsMixin, BaseModel):
    __tablename__ = "author"

    name: Mapped[str] = mapped_column(sql.String, nullable=False)
    email: Mapped[str] = mapped_column(sql.String, nullable=False)
    commits: Mapped[Set["Commit"]] = relationship(back_populates="author")


class Repository(IdMixin, TimestampsMixin, BaseModel):
    __tablename__ = "repository"

    name: Mapped[str] = mapped_column(sql.String, nullable=False)
    commits: Mapped[Set["Commit"]] = relationship(back_populates="repository")
    workspace_id: Mapped[int] = mapped_column(sql.ForeignKey("workspace.id"), nullable=False)
    workspace: Mapped["Workspace"] = relationship(back_populates="repositories")



class Commit(BigIdMixin, CreatedAtMixin, BaseModel):
    __tablename__ = "commit"

    committed_at: Mapped[datetime] = mapped_column(sql.DateTime, nullable=False)
    files_modified: Mapped[int] = mapped_column(sql.Integer, nullable=False)
    lines_added: Mapped[int] = mapped_column(sql.Integer, nullable=False)
    lines_removed: Mapped[int] = mapped_column(sql.Integer, nullable=False)
    repository_id: Mapped[int] = mapped_column(sql.ForeignKey("repository.id"), nullable=False)
    repository: Mapped["Repository"] = relationship(back_populates="commits")
    author_id: Mapped[int] = mapped_column(sql.ForeignKey("author.id"), nullable=False)
    author: Mapped["Author"] = relationship(back_populates="commits")

