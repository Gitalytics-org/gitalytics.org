#!/usr/bin/python3
# -*- coding=utf-8 -*-
r"""

"""
import os
import os.path as p
import glob
import time
import logging
import importlib.util
import fastapi.middleware.cors
import fastapi.staticfiles
from __version__ import __version__


ROOT = p.dirname(__file__)

app = fastapi.FastAPI(
    title="gitalytics.org",
    description=__doc__,
    version=__version__,
)
app.add_middleware(
    fastapi.middleware.cors.CORSMiddleware,
    allow_origins=["https://gitalytics.org", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


if __debug__:
    @app.middleware("http")
    async def add_process_time_header(request: fastapi.Request, call_next):
        start_time = time.perf_counter_ns()
        response = await call_next(request)
        process_time = time.perf_counter_ns() - start_time
        response.headers["X-Process-Time"] = str(process_time)
        return response


logging.info("Loading routes")

for fp in glob.glob("**/*.py", root_dir=p.join(ROOT, "routes"), recursive=True):
    MODULE_NAME = '.'.join(["", "routes", *(p.normpath(fp.removesuffix(".py")).split(os.sep))])
    logging.info(f"Loading: {MODULE_NAME}")
    try:
        module = importlib.import_module(MODULE_NAME, package=__package__)
    except Exception as exception:
        logging.critical(f"Failed to load route: {MODULE_NAME}", exc_info=exception)
        raise
    if hasattr(module, "router") and isinstance(module.router, fastapi.APIRouter):
        logging.debug(f"Include router from {MODULE_NAME}")
        app.include_router(module.router, prefix="/api")

logging.info("Successfully loaded all routes")

# only now mount (order is important!)
app.mount(
    "/",
    fastapi.staticfiles.StaticFiles(
        directory=p.join(ROOT, "web-ui"),
        html=True,
        check_dir=False
    ),
    name="web-ui"  # don't know why
)
