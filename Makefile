#  make sure docker is sudo
ifeq ($(shell uname), Linux)
  DOCKER_COMPOSE=docker-compose
else
  DOCKER_COMPOSE=docker compose
endif

start-client:
	cd client && npm install && npm start

docker-up:
	$(DOCKER_COMPOSE) up -d

# Full start: start client then docker
full-start: start-client docker-up
