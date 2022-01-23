# NodeJS + RabbitMQ - Consumer + Producer example

The purpose of this repository is showing how to correctly create a *producer* and a *consumer* for RabbitMQ inside NodeJS.

## Instructions

Run ```npm install``` in main directory.

Run ```docker-compose up -d``` in main directory.

Run ```node index.js``` in main directory.

## Example request

To test the behaviour the following cURL could be executed:

```curl -X POST http://localhost:3000 -H 'Content-Type: application/json' -d '{"user":"user","password":"password"}'```

The same body should be printed in the console.