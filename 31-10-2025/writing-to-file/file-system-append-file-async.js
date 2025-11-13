const fs = require('fs').promises
const path = require('path')

async function appendFile() {
  try {
    const filePath = path.join(__dirname, 'files', 'append-async.txt')

    const content = 'Hello World\n'

    await fs.appendFile(filePath, content, 'utf-8')
    console.log('File written successfully')
  } catch (error) {
    console.error('Error while writing to file: ', error)
  }
}

(async () => {
  await appendFile()
})()