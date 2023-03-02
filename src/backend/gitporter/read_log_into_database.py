import functools
from database import DatabaseSession, models as dbm
from .git_command import parse_git_log


def read_log_into_database(log: str, repository: dbm.Repository, session: DatabaseSession):
    for parsed_commit in parse_git_log(log):
        commit = dbm.Commit(
            committed_at=parsed_commit.committed_at,
            files_modified=parsed_commit.files_changed,
            lines_added=parsed_commit.lines_inserted,
            lines_removed=parsed_commit.lines_deleted,
            repository=repository,
            author=get_or_create_author(name=parsed_commit.author_name, email=parsed_commit.email, session=session),
        )
        session.add(commit)
    repository.last_commit_hash = parsed_commit.hash
    session.commit()

@functools.lru_cache(maxsize=50)
def get_or_create_author(name: str, email: str, session: DatabaseSession) -> dbm.Author:
    author: dbm.Author|None = session.query(dbm.Author) \
        .filter(dbm.Author.name == name.encode("utf-8", "surrogateescape"),
                dbm.Author.email == email.encode("utf-8", "surrogateescape")) \
        .one_or_none()

    if author is not None:
        return author

    author = dbm.Author(
        name=name,
        email=email,
    )
    session.add(author)
    return author
