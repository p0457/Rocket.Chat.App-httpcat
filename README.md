# Rocket.Chat.App-httpcat

Returns a cat embodying the provided HTTP status code.

## Configuration

TODO

## Docker
A Dockerfile and docker-compose are provided.

Build the docker image and run it to deploy to your server:
`docker build -t rocketchatapp_httpcat . && docker run -it --rm -e URL=YOUR_SERVER -e USERNAME=YOUR_USERNAME -e PASSWORD=YOUR_PASSWORD rocketchatapp_httpcat`

Build the docker image and run docker-compose to deploy to your server:
`docker build -t rocketchatapp_httpcat . && docker-compose run --rm -e URL=YOUR_SERVER -e USERNAME=YOUR_USERNAME -e PASSWORD=YOUR_PASSWORD rocketchatapp_httpcat`
