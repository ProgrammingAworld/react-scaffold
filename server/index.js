const jsonServer = require('json-server');
// const path = require('path');
const ip = require('ip').address();
const generator = require('./generator')
const rewriterJSON = require('./rewriterJSON')

const server = jsonServer.create();
// const router = jsonServer.router(path.join(__dirname, 'db.json'));
const router = jsonServer.router(generator());
const middlewares = jsonServer.defaults();

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);
server.use(jsonServer.bodyParser);

server.use(jsonServer.rewriter(rewriterJSON))
server.use('/api', router);
server.listen({
    host: ip,
    port: 3003,
    delay: 5000
}, () => {
    console.log(`JSON Server is running in http://${ip}:3003`);
});
