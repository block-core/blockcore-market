import { MongoClient } from "mongodb";

const connectionString = process.env.MARKET_DATABASE || "";
const client = new MongoClient(connectionString);

let conn;
try {
  conn = await client.connect();
} catch (e) {
  console.error(e);
}

let db = conn.db("sample_training");
// let db = conn.db("blockcore-market");

export default db;
