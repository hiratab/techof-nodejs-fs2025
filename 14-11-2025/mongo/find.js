const { MongoClient } = require('mongodb')

const MONGO_URI = "mongodb+srv://14112025:xtyGBdx204CHodta@techof.0l1vepo.mongodb.net/?appName=TechOf"
const DATABASE_NAME = "techof"
const COLLECTION_NAME = "my-first-collection"

const client = new MongoClient(MONGO_URI)

async function main() {
  console.log("Connecting to the database")
  await client.connect()

  const db = client.db(DATABASE_NAME)
  const collection = db.collection(COLLECTION_NAME)

  const results = await collection.find({
    name: {
      $regex: "ana",
      $options: "i"
    }
  }).toArray()
  console.log('results', results)


  console.log("Disconneting from the database")
  await client.close()
  console.log("Disconnected from database")
}

main()
