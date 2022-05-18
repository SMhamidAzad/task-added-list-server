const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;


// user-task
// Up2OlAVNqjTDS6UQ

// middleware 
app.use(cors());
app.use(express.json())


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.s6fcl.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("alltask").collection("tasks");
//   // perform actions on the collection object
//   client.close();
// });

async function run(){
    try{
       await client.connect();
       const taskCollection = client.db('todotask').collection('task')
      
       app.post('/task', async (req, res) => {
        const task = req.body;
        const result = await taskCollection.insertOne(task);
        res.send(result)
      });
    }
    finally{
  
    }
  }
  run().catch(console.dir)


// root api
app.get('/',(req, res)=>{
    res.send('to do is running');
})

app.listen(port, ()=>{
    console.log('Listening to port ',port);
})