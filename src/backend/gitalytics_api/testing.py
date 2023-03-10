#!/usr/bin/python3
# -*- coding=utf-8 -*-
r"""

"""
from fastapi.testclient import TestClient
from gitalytics_api import api

client = TestClient(app=api)

response = client.get("/")
assert response.status_code == 200
assert response.json() == {"Hello": "World"}

print("api could be imported and started")
