import express from "express";
import db from "../db/conn.mjs";
import MUUID from "uuid-mongodb";

const mUUID = MUUID.mode("relaxed"); // use relaxed mode

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let collection = await db.collection("category");
    let results = await collection.find({}).limit(50).toArray();

    res.send(results).status(200);
  } catch (err) {
    console.log(err);
  }
});

// Fetches the root categories
router.get("/root", async (req, res) => {
  let collection = await db.collection("category");
  let results = await collection.aggregate([{ $project: { name: 1, icon: 1, slug: 1, parent: 1, sort: 1 } }, { $sort: { sort: 1 } }, { $limit: 50 }]).toArray();
  res.send(results).status(200);
});



// Fetches the latest posts
router.get("/latest", async (req, res) => {
  let collection = await db.collection("category");
  let results = await collection.aggregate([{ $project: { author: 1, title: 1, tags: 1, date: 1 } }, { $sort: { date: -1 } }, { $limit: 3 }]).toArray();
  res.send(results).status(200);
});

// Get a single post
router.get("/:id", async (req, res) => {
  let collection = await db.collection("category");

  let query = { _id: MUUID.from(req.params.id) };
  //   let query = { _id: ObjectId(req.params.id) };
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// Add a new document to the collection
router.post("/", async (req, res) => {
  try {
    let collection = await db.collection("category");
    let newDocument = req.body;

    // Ensure we don't have an id field. If we do, remove it.
    delete newDocument.id;

    newDocument._id = MUUID.v4();
    newDocument.date = new Date();
    let result = await collection.insertOne(newDocument);

    // const insertedId = MUUID.from(result.insertedId).toString();
    // console.log(`insertOne with id ${insertedId} succeeded`);
    // result.humanId = insertedId;

    res
      .send({
        id: result.insertedId,
      })
      .status(204);
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

  let collection = await db.collection("category");
  let result = await collection.updateOne(query, updates);

  res.send(result).status(200);
});

// Delete an entry
router.delete("/:id", async (req, res) => {
  const query = { _id: MUUID.from(req.params.id) };
  //   const query = { _id: ObjectId(req.params.id) };

  const collection = db.collection("category");
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});

export default router;
