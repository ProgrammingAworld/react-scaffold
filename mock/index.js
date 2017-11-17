const path = require('path')
const jsonServer = require('json-server')
const ip = require('ip').address()
const server = jsonServer.create()
const router = jsonServer.router(path.join(__dirname, 'routes.json'))
const middlewares = jsonServer.defaults()

server.use(jsonServer.bodyParser)
server.use(middlewares)
server.use(router)

server.listen({
  host: ip,
  port: 3333
}, ()=>{
  console.log(`JSON server is running in http://${ip}:3333`)
})