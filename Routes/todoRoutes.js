import express from 'express';
import { default as mongodb, ObjectId } from 'mongodb';

const router = express.Router();
let MongoClient = mongodb.MongoClient;

//Routes using mongoDB
let connectionString = 'mongodb+srv://tairobea:Robbaby2022@cluster0.h6s8hn0.mongodb.net/?retryWrites=true&w=majority';

MongoClient.connect(connectionString, { useUnifiedTopology: true })
.then(client => {
console.log('Connected to Database');

const db = client.db('taskList');
const tasksCollection = db.collection('tasks');

// CREATE - POST request
router.post('/', (req, res) => {
    const task = req.body;
    tasksCollection.insertOne(task)
    .then(result => {
        console.log(task);
        console.log(result);
        res.send(result);
    })
    .catch(error => console.error(error))
})

// READ - GET request
router.get('/', (req, res) => {
    const cursor = db.collection('tasks').find().toArray()
    .then(result => {
        console.log(result);
        res.send(result);
    })
    .catch(error => console.error(error))
})

// UPDATE - PUT request
router.put('/:itemNum', (req, res) => {
    const itemNum = req.body.itemNum
    tasksCollection.findOneAndUpdate(
    { itemNum: `${itemNum}` },
    {
        $set: {
        itemNum: req.body.itemNum,
        task: req.body.task
        }
    },
    {
        upsert: true
    })
    .then(result => {
        console.log(result);
        res.send(result);
    })
    .catch(error => console.error(error));
})

// DELETE - DELETE request
router.delete('/:id', (req, res) => {
    const taskID = req.params.id;
    console.log(taskID);
    tasksCollection
     .deleteOne({ _id: ObjectId(taskID) })
     .then(result => {
        console.log(result);
        res.send(result);
     })
     .catch((error) => console.error(error));
   });

})
.catch(error => console.error(error));

export default router;

