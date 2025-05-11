start-client:
	cd client && npm install && npm start

docker-up:
	docker-compose up -d

full-start: start-client docker-up