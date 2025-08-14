import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.DATABASE_URL || "mongodb://localhost:27017/myDB");

// Connect to MongoDB
try {
  await client.connect();
  console.log("✅ Connected to MongoDB");
} catch (error) {
  console.error("❌ Error connecting to MongoDB:", error);
}

const db = client.db("myDB");

export { db as client };
