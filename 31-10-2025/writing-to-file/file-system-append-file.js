const fs = require('fs')
const path = require('path')

try {
  const filePath = path.join(__dirname, 'files', 'append.txt')

  const content = 'Hello World\n'

  fs.appendFileSync(filePath, content, 'utf-8')
  console.log('File written successfully')
} catch (error) {
  console.error('Error while writing to file: ', error)
}