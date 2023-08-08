import express from "express";
import db from "../db/conn.mjs";
import MUUID from "uuid-mongodb";

const mUUID = MUUID.mode("relaxed"); // use relaxed mode

const router = express.Router();

// Get a list of 50 posts
router.get("/", async (req, res) => {
  try {
    let collection = await db.collection("collection");
    let results = await collection.find({}).limit(50).toArray();

    res.send(results);
  } catch (err) {
    console.log(err);
  }
});

// Fetches the latest posts
router.get("/latest", async (req, res) => {
  let collection = await db.collection("collection");
  let results = await collection.aggregate([{ $project: { author: 1, title: 1, tags: 1, date: 1 } }, { $sort: { date: -1 } }, { $limit: 3 }]).toArray();
  res.send(results);
});

// Get a single post
router.get("/:id", async (req, res) => {
  let collection = await db.collection("collection");

  let query = { _id: MUUID.from(req.params.id) };
  //   let query = { _id: ObjectId(req.params.id) };
  let result = await collection.findOne(query);

  if (!result) res.status(404).send("Not found");
  else res.send(result);
});

// Add a new document to the collection
router.post("/", async (req, res) => {
  try {
    let collection = await db.collection("collection");
    let newDocument = req.body;

    // Ensure we don't have an id field. If we do, remove it.
    delete newDocument.id;

    newDocument._id = MUUID.v4();
    newDocument.date = new Date();
    let result = await collection.insertOne(newDocument);

    // const insertedId = MUUID.from(result.insertedId).toString();
    // console.log(`insertOne with id ${insertedId} succeeded`);
    // result.humanId = insertedId;

    res.status(204).send({
      id: result.insertedId,
    });
  } catch (err) {
    console.log(err);
  }
});

// Update the post with a new comment
router.patch("/item/:id", async (req, res) => {
  const query = { _id: MUUID.from(req.params.id) };
  //   const query = { _id: ObjectId(req.params.id) };

  const updates = {
    $push: { comments: req.body },
  };

  let collection = await db.collection("collection");
  let result = await collection.updateOne(query, updates);

  res.send(result);
});

// Delete an entry
router.delete("/:id", async (req, res) => {
  const query = { _id: MUUID.from(req.params.id) };
  //   const query = { _id: ObjectId(req.params.id) };

  const collection = db.collection("collection");
  let result = await collection.deleteOne(query);

  res.send(result);
});

export default router;
