#!/usr/bin/python3
# -*- coding=utf-8 -*-
r"""

"""
import sys
import glob
import logging
import os.path as p
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

logging.info("Loading routes")

for fp in glob.glob("**/*.route.py", root_dir=p.join(ROOT, "routes"), recursive=True):
    MODULE_NAME = "routes." + fp.split(".", 1)[0].replace(p.pathsep, ".")
    MODULE_PATH = p.join(ROOT, "routes", fp)
    logging.info(f"Attempt to load: {fp} ({MODULE_NAME})")
    spec = importlib.util.spec_from_file_location(MODULE_NAME, MODULE_PATH)
    module = importlib.util.module_from_spec(spec)
    sys.modules[spec.name] = module
    try:
        logging.debug("load and include")
        spec.loader.exec_module(module)
        app.include_router(module.router, prefix="/api")
    except Exception as exception:
        del sys.modules[spec.name]
        logging.critical(f"Failed to load {fp}", exc_info=exception)
        raise
    else:
        logging.info(f"loaded: {fp}")

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
