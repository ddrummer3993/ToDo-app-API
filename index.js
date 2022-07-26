import cors from "cors";
import express from 'express';
import { default as mongodb } from 'mongodb';
let MongoClient = mongodb.MongoClient;

const app = express();


app.use(express.json());

app.listen(3000, ()=>{
  console.log("listening to port 3000");
});


  let connectionString = 'mongodb+srv://tairobea:Robbaby2022@cluster0.h6s8hn0.mongodb.net/?retryWrites=true&w=majority';

  MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database');

    const db = client.db('taskList');
    const tasksCollection = db.collection('tasks');

   

    



   
    app.post('/toDo', (req, res) => {
      const task = req.body;
      tasksCollection.insertOne(task)
        .then(result => {
          console.log(task);
        })
        .catch(error => console.error(error))
    })

    app.get('/toDo', (req, res) => {
      const cursor = db.collection('tasks').find().toArray()
      .then(results => {
        console.log(results)
      })
      .catch(error => console.error(error))
    // ...
  })


  })
  .catch(error => console.error(error));