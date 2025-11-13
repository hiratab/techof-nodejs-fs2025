const { parseStringToJsonMiddleware } = require('./parseStringToJsonMiddleware')
const { readFileMiddleware } = require('./readFileMiddleware')
const { replaceTextWithDataMiddleware } = require('./replaceTextWithDataMiddleware')

module.exports = {
  parseStringToJsonMiddleware,
  readFileMiddleware,
  replaceTextWithDataMiddleware,
}