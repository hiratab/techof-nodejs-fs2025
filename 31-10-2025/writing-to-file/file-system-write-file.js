const fs = require('fs')
const path = require('path')

try {
  const filePath = path.join(__dirname, 'files', 'write.txt')

  const content = 'Hello World'

  fs.writeFileSync(filePath, content, 'utf-8')
  console.log('File written successfully')
} catch (error) {
  console.error('Error while writing to file: ', error)
}