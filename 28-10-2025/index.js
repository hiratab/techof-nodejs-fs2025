const { add } = require('./math')
const { minus, baseValue: BASE_VALUE } = require('./minus')
const { greeting, sendMessage } = require('./name')

console.log('Hello from Node.js', BASE_VALUE)

var firstName = 'Bruno'
let lastName = 'Hirata'
console.log(greeting(firstName, lastName))

console.log(sendMessage({
  senderName: 'Bruno',
  message: 'Welcome to our first class',
  subject: 'First Node.js class'
}))

console.log('The sum is ', add(1, 2))
console.log('The diff is ', minus(10, 5))