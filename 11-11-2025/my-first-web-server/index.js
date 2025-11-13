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
        return res.end()

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
        res.end(data.replaceAll('$PRODUCTS', products))

      } catch (error) {
        res.writeHead(500)
        res.end('Internal Server Error')
      }
      break;

    case '/add-user-to-file':
      try {
        const filePath = path.join(__dirname, 'files', 'file.txt')

        const firstName = searchParams.get('firstName')
        const lastName = searchParams.get('lastName')
        const greeting = buildGreetingMessage({
          firstName,
          lastName
        })

        await fs.appendFile(filePath, `${greeting}<br>\n`, 'utf-8')

        const fileContent = await fs.readFile(filePath, 'utf-8')

        const page = await fs.readFile(
          path.join(__dirname, 'public', 'file.html'),
          'utf-8'
        )

        res.writeHead(200, {
          'Content-Type': 'text/html'
        })
        res.end(page.replaceAll('$FILE_CONTENT', fileContent))
      } catch (error) {
        res.writeHead(500)
        res.end('Internal Server Error')
      }
      break;

    case '/file':
      try {
        const { method } = req
        const filePath = path.join(__dirname, 'files', 'file.txt')

        console.log('file method', method)
        if ('POST' === method) {

          let body = ''
          req.on('data', (chunk) => {
            console.log('chunk', chunk)
            body += chunk.toString()
          })

          req.on('end', async () => {
            const [firstName, lastName] = body.split('&')
            const greeting = buildGreetingMessage({
              firstName,
              lastName
            })

            await fs.appendFile(filePath, `${greeting}<br>\n`, 'utf-8')

            const fileContent = await fs.readFile(filePath, 'utf-8')

            const page = await fs.readFile(
              path.join(__dirname, 'public', 'file.html'),
              'utf-8'
            )

            res.writeHead(200, {
              'Content-Type': 'text/html'
            })
            res.end(page.replaceAll('$FILE_CONTENT', fileContent))
          })
        } else {
          const fileContent = await fs.readFile(filePath, 'utf-8')

          const page = await fs.readFile(
            path.join(__dirname, 'public', 'file.html'),
            'utf-8'
          )

          res.writeHead(200, {
            'Content-Type': 'text/html'
          })
          res.end(page.replaceAll('$FILE_CONTENT', fileContent))
        }
      } catch (error) {
        console.error(error)
        res.writeHead(500)
        res.end('Internal Server Error')
      }
      break;

    case '/image':
      try {
        const filePath = path.join(__dirname, 'files', 'image.png')

        const fileContent = await fs.readFile(filePath)

        res.writeHead(200, {
          'Content-Type': 'image/png'
        })
        res.end(fileContent)
        // res.write(page.replaceAll('$FILE_CONTENT', fileContent))
      } catch (error) {
        res.writeHead(500)
        res.end('Internal Server Error')
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
        res.end()

      } catch (error) {
        res.writeHead(404)
        res.end('Not Found')
      }
      break;
  }

  return res.end()

})

server.listen(3000, () => {
  console.log('Server running on 3000')
})
