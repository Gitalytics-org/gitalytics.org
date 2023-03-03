#!/usr/bin/python3
# -*- coding=utf-8 -*-
r"""
This file contanis all SQLAlchemy ORM Database models
"""

import sqlalchemy as sql
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.ext.hybrid import hybrid_property
from .db import BaseModel
from .model_components import IdMixin, BigIdMixin, TimestampsMixin, CreatedAtMixin
from .enums import GitPlatform
from datetime import datetime, date
from typing import Set

repository_access = sql.Table(
    "repository_access",
    BaseModel.metadata,
    sql.Column("session_id", sql.ForeignKey("session.id")),
    sql.Column("repository_id", sql.ForeignKey("repository.id")),
)

class Workspace(IdMixin, TimestampsMixin, BaseModel):
    __tablename__ = "workspace"

    name: Mapped[str] = mapped_column(sql.String, nullable=False)
    logo_url: Mapped[str] = mapped_column(sql.String, nullable=True)
    platform: Mapped[GitPlatform] = mapped_column(sql.Enum(GitPlatform), nullable=False)
    repositories: Mapped[Set["Repository"]] = relationship(back_populates="workspace")


class Author(IdMixin, TimestampsMixin, BaseModel):
    __tablename__ = "author"

    commits: Mapped[Set["Commit"]] = relationship(back_populates="author")

    # Encoding surrogate characters is required, since sqlalchemy cannot handle them. Example from linux kernel repo logs: '\udcdf'
    _name: Mapped[str] = mapped_column(sql.String, nullable=False)
    @hybrid_property
    def name(self):
        return self._name
    @name.setter
    def name(self, value: str):
        self._name = value.encode("utf-8", "surrogateescape")
    _email: Mapped[str] = mapped_column(sql.String, nullable=False)
    @hybrid_property
    def email(self):
        return self._email
    @email.setter
    def email(self, value: str):
        self._email = value.encode("utf-8", "surrogateescape")


class Repository(IdMixin, TimestampsMixin, BaseModel):
    __tablename__ = "repository"

    name: Mapped[str] = mapped_column(sql.String, nullable=False)
    last_commit_hash: Mapped[str] = mapped_column(sql.String, nullable=True)
    commits: Mapped[Set["Commit"]] = relationship(back_populates="repository")
    workspace_id: Mapped[int] = mapped_column(sql.ForeignKey("workspace.id"), nullable=False)
    workspace: Mapped["Workspace"] = relationship(back_populates="repositories")


class Commit(IdMixin, CreatedAtMixin, BaseModel):
    __tablename__ = "commit"

    committed_at: Mapped[datetime] = mapped_column(sql.DateTime, nullable=False)
    files_modified: Mapped[int] = mapped_column(sql.Integer, nullable=False)
    lines_added: Mapped[int] = mapped_column(sql.Integer, nullable=False)
    lines_removed: Mapped[int] = mapped_column(sql.Integer, nullable=False)
    repository_id: Mapped[int] = mapped_column(sql.ForeignKey("repository.id"), nullable=False)
    repository: Mapped["Repository"] = relationship(back_populates="commits")
    author_id: Mapped[int] = mapped_column(sql.ForeignKey("author.id"), nullable=False)
    author: Mapped["Author"] = relationship(back_populates="commits")


class Session(IdMixin, TimestampsMixin, BaseModel):
    __tablename__ = "session"

    access_token: Mapped[str] = mapped_column(sql.String, nullable=False)
    refresh_token: Mapped[str] = mapped_column(sql.String, nullable=True)
    platform: Mapped[GitPlatform] = mapped_column(sql.Enum(GitPlatform), nullable=False)
    repositories: Mapped[Set["Repository"]] = relationship(secondary="repository_access")
    last_seen: Mapped[date] = mapped_column(sql.Date(), server_default=sql.func.current_date())
