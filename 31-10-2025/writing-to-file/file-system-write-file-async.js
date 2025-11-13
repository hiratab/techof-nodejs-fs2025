const fs = require('fs').promises
const path = require('path')

async function writeFile() {
  try {
    const filePath = path.join(__dirname, 'files', 'write-async.txt')

    const content = 'Hello World'

    await fs.writeFile(filePath, content, 'utf-8')
    console.log('File written successfully')
  } catch (error) {
    console.error('Error while writing to file: ', error)
  }
}

(async () => {
  await writeFile()
})()
