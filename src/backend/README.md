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

> all python-files in `routes` (`src/backend/gitalytics_api/routes/`) are automatically imported.
> if they have a `fastapi.APIRouter` variable called router it's included
```python
# -*- coding=utf-8 -*-
r"""

"""
import fastapi

router = fastapi.APIRouter(prefix=...)
```
