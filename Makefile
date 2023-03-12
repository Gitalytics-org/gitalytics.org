# It is reccomended to start 3 terminal tabs/windows. One for each of the following:
#   - build-frontend
#   - start-database
#   - start-server
# That way, you can monitor potential errors in all areas.

usage:
	echo "usage: make <command>"

build-frontend:
	cd ./src/frontend && \
	npm install && \
	npm run dev

start-database:
	docker-compose up

restart-database:
	docker stop gitalytics-database-1
	docker rm gitalytics-database-1
	docker-compose up

# Depends on a running database and a built fronted
start-server:
	cd ./src/backend && \
	pipenv sync && \
	pipenv run python3 main.py create-database && \
	pipenv run python3 main.py run-server
