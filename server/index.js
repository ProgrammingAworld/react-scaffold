const path = require('path');
const jsonServer = require('json-server');
const ip = require('ip').address();

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

server.use(jsonServer.bodyParser);
server.use(middlewares);

server.use(router);
server.listen({
    host: ip,
    port: 3003
}, () => {
    console.log(`JSON Server is running in http://${ip}:3003`);
});
