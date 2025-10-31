const http = require('http')

const htmlPage = "<!DOCTYPE html><html><head><title>Node.js</title></head><body><p>Hello $NAME</p></body></html>"

// REST API
const server = http.createServer((req, res, next) => {
  console.log('Request received')
  res.writeHead(200, {
    'Content-Type': 'text/html'
  })
  res.end(htmlPage.replaceAll('$NAME', 'Bruno'))
})

server.listen(3000, () => {
  console.log('Server running on 3000')
})
