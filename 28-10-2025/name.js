// A function receives first and last name return with 
// hello
const greeting = (firstName, lastName) => {
  return `Hello, ${firstName} ${lastName}`
}

// A function receives sender name, message, subject
// Print
const sendMessage = ({
  senderName,
  message,
  subject
}) => {
  return `
Sender: ${senderName}
Message: ${message}
Subject: ${subject}
`
}

module.exports = {
  greeting,
  sendMessage,
}