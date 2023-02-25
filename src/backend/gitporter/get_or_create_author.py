import functools
from database import DatabaseSession, models as dbm

@functools.lru_cache(maxsize=50)
def get_or_create_author(name: str, email: str, session: DatabaseSession) -> dbm.Author:
    author: dbm.Author|None = session.query(dbm.Author) \
        .filter(dbm.Author.name == name,
                dbm.Author.email == email) \
        .one_or_none()

    if author is not None:
        return author

    author = dbm.Author(
        name=name,
        email=email
    )
    session.add(author)
    return author
