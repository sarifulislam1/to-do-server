const express = require("express")
const app = express()
const port = process.env.PORT || 4000
const cors = require("cors")

require('dotenv').config()
app.use(express.json());
app.use(cors());


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wwril.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        await client.connect();
        const taskCollection = client.db("tasksInfo").collection("tasks");

        // post api

        app.post('/addTask', async (req, res) => {
            const data = req.body
            const result = await taskCollection.insertOne(data)

            res.send(result)
        })

        // get api
        app.get('/addTask', async (req, res) => {

            const q = req.query
            const cursor = taskCollection.find(q)
            const result = await cursor.toArray()

            res.send(result)

        })

        //delet api 
        app.delete('/addTask/:id', (req, res) => {
            const id = req.params.id
            const filter = { _id: ObjectId(id) }

            const result = taskCollection.deleteOne(filter)
            res.send(result)
        })

    } finally {

    }
}



run().catch(console.dir)

app.get('/', (req, res) => {
    res.send('hello world')
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});