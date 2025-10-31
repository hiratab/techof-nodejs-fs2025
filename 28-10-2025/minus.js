const minus = (x, y) => {
  return x - y
}

function diff(x, y) {
  return minus(x, y)
}

const BASE_VALUE = 10

module.exports = {
  minus,
  diff,
  baseValue: BASE_VALUE
}