#!/usr/bin/python3
# -*- coding=utf-8 -*-
r"""

"""
import sys
import os.path as p
import glob
import importlib.util
import fastapi.middleware.cors
import fastapi.staticfiles
from runconfig import __version__, args


ROOT = p.dirname(__file__)


app = fastapi.FastAPI(
    title="gitalytics.org",
    description=__doc__,
    version=__version__,
)
app.add_middleware(
    fastapi.middleware.cors.CORSMiddleware,
    allow_origins=["*"],  # maybe replace later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


for fp in glob.glob("**/*.route.py", root_dir=p.join(ROOT, "routes"), recursive=True):
    MODULE_NAME = "routes." + fp.split(".", 1)[0].replace(p.pathsep, ".")
    MODULE_PATH = p.join(ROOT, "routes", fp)
    print("Attempt to load", MODULE_NAME, [MODULE_PATH])
    spec = importlib.util.spec_from_file_location(MODULE_NAME, MODULE_PATH)
    module = importlib.util.module_from_spec(spec)
    sys.modules[spec.name] = module
    try:
        print("load and include")
        spec.loader.exec_module(module)
        app.include_router(module.router, prefix="/api")
    except Exception:
        # del sys.modules[spec.name]
        raise
    else:
        print("loaded:", fp, [MODULE_NAME, MODULE_PATH])


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
