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

  const result = await collection.insertMany([
    {
      name: "José",
      age: 34,
      skills: ["React", "Typescript", "css"],
      course: {
        name: "Fullstack development",
        duration: {
          unit: "months",
          value: 9
        }
      }
    },
    {
      name: "Beatriz",
      age: 18,
      skills: ["React", "Typescript", "css", "Node.js", "MongoDB"],
      course: {
        name: "Fullstack development",
        duration: {
          unit: "months",
          value: 9
        }
      }
    },
    {
      name: "Rafael",
      age: 38,
      skills: ["Python", "SQL", "PowerBI", "Anaconda", "Pandas"],
      course: {
        name: "Data",
        duration: {
          unit: "months",
          value: 6
        }
      }
    }
  ])

  
  console.log('result', result)

  console.log("Disconneting from the database")
  await client.close()
  console.log("Disconnected from database")
}

main()
