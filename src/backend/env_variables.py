from pydantic import BaseSettings


class Settings(BaseSettings):
    APP_HOSTNAME: str
    APP_COOKIE_KEY: str
    MYSQL_DATABASE: str
    MYSQL_USER: str
    MYSQL_PASSWORD: str
    GITHUB_CLIENT_ID: str
    GITHUB_CLIENT_SECRET: str

    class Config:
        env_file = ".env"


env = Settings()
