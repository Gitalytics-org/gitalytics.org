# First you need to start the database server with "make start-database".
# The database can be completely wiped with "make restart-database". Note, that you will need to restart the gitalyitcs server.
#
# It is reccomended to start 2 terminal tabs/windows. One for each of the following:
#   - build-frontend
#   - start-server
# That way, you can monitor potential errors in all areas.


usage:
	echo "usage: make <command>"

build-frontend:
	cd ./src/frontend && \
	npm install && \
	npm run dev

start-database:
	docker-compose up -d
	pipenv run python3 main.py create-database

stop-database:
	docker-compose down

restart-database: stop-database start-database

# Depends on a running database and a built fronted
start-server:
	cd ./src/backend && \
	pipenv sync && \
	pipenv run python3 main.py run-server
