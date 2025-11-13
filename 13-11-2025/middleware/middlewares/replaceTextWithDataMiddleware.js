const replaceTextWithDataMiddleware = (req, res, next) => {
  const greeting = 'Hello'
  req.data = req.rawData.replaceAll('$GREETING', greeting)

  next()
}

module.exports = {
  replaceTextWithDataMiddleware
}