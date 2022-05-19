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


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.s6fcl.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
       await client.connect();
       const taskCollection = client.db('todotask').collection('task')
      
      //  post api 
       app.post('/task', async (req, res) => {
        const task = req.body;
        const result = await taskCollection.insertOne(task);
        res.send(result)
      });

      // get api 
      app.get('/task', async(req,res)=>{
        const query = {};
        const cursor = taskCollection.find(query);
        const result = await cursor.toArray();
        res.send(result)
      })

      // delete api 
      app.delete('/task/:id', async (req, res) => {
        const id = req.params.id;
        const query = { _id: ObjectId(id) };
        const result = await taskCollection.deleteOne(query);
        res.send(result);
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