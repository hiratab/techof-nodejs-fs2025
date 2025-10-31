const buildGreetingMessage = ({
  firstName,
  lastName,
}) => {
  if (firstName) {
    return `Hello, ${firstName} ${lastName}`
  }

  return `Hello`
}

module.exports = {
  buildGreetingMessage
}
