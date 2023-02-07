# Dependence-Management

we use `pipenv`
(`python3 -m pip install pipenv`)

tip: add `export PIPENV_VENV_IN_PROJECT=1` to `.bashrc`

```commandline
$ cd src/backend/
$ pipenv install
$ pipenv run python3 main.py [...args]
```

# environment template
```env
GITHUB_CLIENT_ID='...'
GITHUB_CLIENT_SECRET='...'
```


# further information

> all files in `routes` (`src/backend/api/routes/`) that end with `.route.py` are automatically imported and must have the following structure
```python
# -*- coding=utf-8 -*-
r"""

"""
import fastapi

router = fastapi.APIRouter(prefix=...)
```

> commandline arguments can be added to `runconfig.py`

> DON'T touch main.py
