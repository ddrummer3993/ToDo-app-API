import express from "express";
import { default as mongodb } from "mongodb";

const router = express.Router();
let MongoClient = mongodb.MongoClient;

//Routes using mongoDB
let connectionString =
  "mongodb+srv://tairobea:Robbaby2022@cluster0.h6s8hn0.mongodb.net/?retryWrites=true&w=majority";

MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then((client) => {
    console.log("Connected to Database");

    const db = client.db("taskList");
    const tasksCollection = db.collection("tasks");

    // CREATE - POST request
    router.post("/", (req, res) => {
      const task = req.body;
      tasksCollection
        .insertOne(task)
        .then((res) => {
          console.log(task);
        })
        .catch((error) => console.error(error));

      res.status(201).send("POST success");
    });

    // READ - GET request
    router.get("/", (req, res) => {
      const cursor = db
        .collection("tasks")
        .find()
        .toArray()
        .then((result) => {
          console.log(result);
          res.status(201).send("GET success");
        })
        .catch((error) => console.error(error));
    });

    // UPDATE - PUT request
    router.put("/:itemNum", (req, res) => {
      const itemNum = req.body.itemNum;
      tasksCollection
        .findOneAndUpdate(
          { itemNum: `${itemNum}` },
          {
            $set: {
              itemNum: req.body.itemNum,
              task: req.body.task,
            },
          },
          {
            upsert: true,
          }
        )
        .catch((error) => console.error(error));

      res.status(201).send("Update Complete.");
    });

    // DELETE - DELETE request
    router.delete("/:itemNum", (req, res) => {
      const itemNum = req.params.itemNum;
      tasksCollection
        .deleteOne({ itemNum: `${itemNum}` })
        .catch((error) => console.error(error));
      res.status(201).send("Delete Complete.");
    });
  })
  .catch((error) => console.error(error));

export default router;
