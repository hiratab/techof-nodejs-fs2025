const parseStringToJsonMiddleware = (property) => {
  return (req, res, next) => {
    req[property] = JSON.parse(req.rawData)
    next()
  }
}

module.exports = {
  parseStringToJsonMiddleware
}