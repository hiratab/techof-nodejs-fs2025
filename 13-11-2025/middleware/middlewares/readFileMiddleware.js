const path = require('path')
const fs = require('fs').promises

const readFileMiddleware = (filePath) => {
  return async (req, res, next) => {
    const data = await fs.readFile(
      path.resolve(...filePath),
      'utf8'
    )

    req.rawData = data

    next()
  }
}

module.exports = {
  readFileMiddleware
}