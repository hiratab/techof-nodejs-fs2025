const fs = require('fs').promises
const path = require('path')

const getProducts = async () => {
  try {
    const filePath = path.join(__dirname, 'data', 'products.json')
    const data = await fs.readFile(filePath, 'utf-8')

    const products = JSON.parse(data)

    return products
  } catch (error) {
    console.error('ERROR while fetching products', error)
  }
}

const buildProducts = async (productName) => {
  const products = await getProducts()
  return products
    .filter(
      product => !productName || productName.toLowerCase() === product.toLocaleLowerCase()
    )
    .map(
      product => `<li>${product.name}</li>`
    ).join('')
}

module.exports = {
  buildProducts
}
