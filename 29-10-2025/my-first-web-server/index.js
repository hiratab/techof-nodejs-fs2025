const http = require('http')
const fs = require('fs').promises
const path = require('path')

const { buildGreetingMessage } = require('./greeting')
const { buildProducts } = require('./products')

// REST API
const server = http.createServer(async (req, res, next) => {
  const reqUrl = new URL(req.url, `http://${req.headers.host}`)
  const searchParams = new URLSearchParams(reqUrl.searchParams)
  console.log(`Request Received at ${reqUrl.pathname} search params`, searchParams)

  switch (reqUrl.pathname) {
    case '/':
      const firstName = searchParams.get('firstName')
      const lastName = searchParams.get('lastName')
      const greeting = buildGreetingMessage({
        firstName,
        lastName
      })

      try {
        const indexPath = path.join(__dirname, 'public', 'index.html')
        const data = await fs.readFile(indexPath, 'utf-8')

        res.writeHead(200, {
          'Content-Type': 'text/html'
        })
        res.write(
          data.replaceAll('$GREETING', greeting)
        )

      } catch (error) {
        res.writeHead(500)
        res.write('Internal Server Error')
      }
      break;
    case '/users':
      try {
        const usersPath = path.join(__dirname, 'public', 'users.html')
        const data = await fs.readFile(usersPath, 'utf-8')

        res.writeHead(200, {
          'Content-Type': 'text/html'
        })
        res.write(data)

      } catch (error) {
        res.writeHead(500)
        res.write('Internal Server Error')
      }
      break;
    case '/products':
      try {
        const productsPath = path.join(__dirname, 'public', 'products.html')
        const data = await fs.readFile(productsPath, 'utf-8')

        const productName = searchParams.get('name')
        const products = await buildProducts(productName)

        res.writeHead(200, {
          'Content-Type': 'text/html'
        })
        res.write(data.replaceAll('$PRODUCTS', products))

      } catch (error) {
        res.writeHead(500)
        res.write('Internal Server Error')
      }
      break;

    default:
      try {
        const notFoundPath = path.join(__dirname, 'public', 'notFound.html')
        const data = await fs.readFile(notFoundPath, 'utf-8')

        res.writeHead(404, {
          'Content-Type': 'text/html'
        })
        res.write(data)

      } catch (error) {
        res.writeHead(404)
        res.write('Not Found')
      }
      break;
  }

  res.end()
})

server.listen(3000, () => {
  console.log('Server running on 3000')
})
