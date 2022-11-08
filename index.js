const express = require('express')
const cors = require('cors');
const app = express()
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

const userName = process.env.DB_USER
const password = process.env.DB_PASSWORD

const uri = `mongodb+srv://${userName}:${password}@cluster0.xazyemr.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {

    }
    finally {

    }
}
run().catch(error => console.log(error))



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})