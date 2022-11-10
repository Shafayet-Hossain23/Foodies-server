const express = require('express')
const cors = require('cors');
const app = express()
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

const userName = process.env.DB_USER
const password = process.env.DB_PASSWORD

const uri = `mongodb+srv://${userName}:${password}@cluster0.xazyemr.mongodb.net/?retryWrites=true&w=majority`;
// console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const serviceCollection = client.db("FooDies").collection("services")
        const reviewCollection = client.db("FooDies").collection("reviews")
        app.get('/services', async (req, res) => {
            const size = parseInt(req.query.size);
            const query = {}
            const cursor = serviceCollection.find(query);
            const services = await cursor.limit(size).toArray();
            const count = await serviceCollection.estimatedDocumentCount();
            res.send({ count, services });
        });
        app.post('/services', async (req, res) => {
            const addServices = req.body
            console.log(addServices)
            const result = await serviceCollection.insertOne(addServices)
            res.send(result)
        });
        app.get('/services/count', async (req, res) => {

            const query = {}
            const cursor = serviceCollection.find(query);
            const services = await cursor.toArray();
            const count = await serviceCollection.estimatedDocumentCount();
            res.send({ count, services });
        });
        app.get('/services/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const result = await serviceCollection.findOne(query);
            res.send(result)
            // console.log(result)
        })
        app.get('/reviews/:id', async (req, res) => {
            const id = req.params.id
            const query = { serviceId: id }
            const result = await reviewCollection.findOne(query);
            res.send(result)
            // console.log(result)
        })
        app.patch('/reviews/:id', async (req, res) => {
            const id = req.params.id
            const reviewsClient = req.body
            console.log(reviewsClient)
            const query = { serviceId: id }
            const updateDoc = {
                $push: {
                    reviews: reviewsClient
                },
            };
            const result = await reviewCollection.updateOne(query, updateDoc);
            res.send(result)
            // console.log(result)
        })
        app.post('/reviews', async (req, res) => {
            const reviewItems = req.body
            console.log(reviewItems)
            const result = await reviewCollection.insertOne(reviewItems)
            res.send(result)
        });
        // const user = {
        //     name: "hafayet"
        // }
        // const result = await reviewCollection.insertOne(user);
        // console.log(result)

    }
    finally {

    }
}
run().catch(error => console.log(error))



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})