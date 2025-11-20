const mongoose = require('mongoose')

const dotenv = require('dotenv')
dotenv.config()

const { ProductModel } = require('./models')

const MONGO_URL = process.env.MONGO_URL

async function createProduct() {
  const product = await ProductModel.create({
    name: 'Product 4',
    price: 200,
    addedBy: 'qualquer-coisa@domain.com'
  })

  console.log(product)

  return product
}

async function main() {
  try {
    await mongoose.connect(MONGO_URL)
    console.log('Connected to DB')

    try {
      await createProduct()
    } catch(err) {
      console.error(err)
    }

  } catch (err) {
    console.error('Failed to connect to MongoDB', err)
  } finally {
    await mongoose.disconnect(MONGO_URL)
    console.log('Disconneted from DB')
  }
}
main()
