import fastapi
from database import createLocalSession

@fastapi.Depends
def get_database_connection():
    db = createLocalSession()
    try:
        yield db
    finally:
        db.close()
