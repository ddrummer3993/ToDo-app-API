import cors from "cors";
import express from 'express';
import { default as mongodb } from 'mongodb';

import todoRouter from "./Routes/todoRoutes.js"

let MongoClient = mongodb.MongoClient;

//deaf server
const app = express();

//middleware setup
app.use(express.json());
app.use(cors());
app.use('/toDo', todoRouter);

const PORT = process.env.PORT || 3000;
app.listen(3000, ()=>{
  console.log("listening to port 3000");
});

