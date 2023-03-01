#!/usr/bin/python3
# -*- coding=utf-8 -*-
r"""

"""
import pydantic


class Settings(pydantic.BaseSettings):
    # required: base64.urlsafe_b64encode(os.urandom(32))  # equal to Fernet.generate_key()
    COOKIE_KEY: str


settings = Settings()
