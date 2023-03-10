FROM python:3.11 as base

# Setup env
ENV LANG C.UTF-8
ENV LC_ALL C.UTF-8
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONFAULTHANDLER 1



RUN apt-get update && apt-get install -y --no-install-recommends gcc
RUN pip install --upgrade pip
RUN pip install pipenv

RUN useradd --create-home gitalytics
WORKDIR /home/gitalytics
COPY . .
RUN chown gitalytics -R .
USER gitalytics

RUN PIPENV_VENV_IN_PROJECT=1 pipenv --python 3.11 install --deploy
RUN pipenv --python 3.11 run python3 -O main.py create-database
CMD pipenv --python 3.11 run python3 -O main.py run-server
