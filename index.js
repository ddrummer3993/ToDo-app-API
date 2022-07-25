import cors from "cors";
import express from 'express';
import bodyParser from 'body-parser';
import { default as mongodb } from 'mongodb';
let MongoClient = mongodb.MongoClient;

const app = express();

app.listen(3000, ()=>{
    console.log("listening to port 3000");
});

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) =>{
    res.sendFile("/Users/tairobea/web_development/star_wars" + '/index.html');
});


  let connectionString = 'mongodb+srv://tairobea:Robbaby2022@cluster0.h6s8hn0.mongodb.net/?retryWrites=true&w=majority';

  MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
  })
  .catch(error => console.error(error));