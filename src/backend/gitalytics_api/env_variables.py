from pydantic import BaseSettings


class Settings(BaseSettings):
    COOKIE_KEY: str

    class Config:
        env_file = ".env"


env = Settings()
