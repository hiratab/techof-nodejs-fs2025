const http = require('http')

// REST API
const server = http.createServer((req, res, next) => {
  console.log('Request received')
  res.end('Hello from Node.js server index2!')
})

server.listen(3001, () => {
  console.log('Server running on 3000')
})
