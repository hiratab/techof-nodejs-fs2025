const { db } = require('./db/knex')

const Store = {
  tableName: 'tb_store'
}

const ProductStore = {
  tableName: 'tb_product_store'
}

async function fetchProducts(){
  const products = await db('tb_product').select('*')
  console.log(products)

  const stores = await db('tb_store').select('*').orderBy('name', 'desc')
  console.log(stores)

  const productStore = await db('tb_product_store as tps')
    .join('tb_product as tp', 'tp.product_id', 'tps.product_id')
    .join('tb_store as ts', 'tps.store_id', 'ts.store_id')
    .where('tps.quantity', '<=', 50)
  console.log(productStore)
}

async function insertStore() {
  const result = await db(Store.tableName).insert({
    name: 'Store 4',
    address: 'Address da Store 4'
  })
  console.log(result)
}

async function insertProductStore() {
  try {
    const result = await db(ProductStore.tableName).insert({
      store_id: 3,
      product_id: 2,
      quantity: 20
    })
    console.log(result)
  } catch (error) {
    console.error(error)
  }
}

async function fetchProductStore() {
  const productStore = await db('tb_product_store as tps')
    .join('tb_product as tp', 'tp.product_id', 'tps.product_id')
    .join('tb_store as ts', 'tps.store_id', 'ts.store_id')
    .select('tps.*, tp.*, ts.*')
    .limit(2)
    .offset(0)
    .orderBy('product_store_id')
  console.log(productStore)
}

(async () => {
  // fetchProducts()
  // insertStore()
  // insertProductStore()
  fetchProductStore()
})()