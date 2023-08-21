import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();
const collectionName = "user";

router.get("/", async (req, res) => {
  let collection = await db.collection(collectionName);
  let results = await collection.find({}).limit(50).toArray();

  res.send(results);
});

router.get("/latest", async (req, res) => {
  let collection = await db.collection(collectionName);
  let results = await collection.aggregate([{ $project: { author: 1, title: 1, tags: 1, date: 1 } }, { $sort: { date: -1 } }, { $limit: 3 }]).toArray();
  res.send(results);
});

router.get("/:id", async (req, res) => {
  let collection = await db.collection(collectionName);
  let query = { _id: ObjectId(req.params.id) };
  let result = await collection.findOne(query);

  if (!result) res.status(404).send("Not found");
  else res.send(result);
});

router.post("/", async (req, res) => {
  let collection = await db.collection(collectionName);
  let newDocument = req.body;
  newDocument.date = new Date();
  let result = await collection.insertOne(newDocument);
  res.status(204).send(result);
});

router.patch("/comment/:id", async (req, res) => {
  const query = { _id: ObjectId(req.params.id) };
  const updates = {
    $push: { comments: req.body },
  };

  let collection = await db.collection(collectionName);
  let result = await collection.updateOne(query, updates);

  res.send(result);
});

router.delete("/:id", async (req, res) => {
  const query = { _id: ObjectId(req.params.id) };

  const collection = db.collection(collectionName);
  let result = await collection.deleteOne(query);

  res.send(result);
});

export default router;
