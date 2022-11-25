const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
 
const port = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());


const uri = "mongodb+srv://<username>:<password>@cluster0.cg4wmwy.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try{
        const appointmentOptionCollection = client.db('resaleMobilePoint').collection('products');

    }
    finally{

    }
}
run().catch(console.log);


app.get('/', async (req, res) => {
    res.send('resale mobile point server is running');
})

app.listen(port, () => console.log(`resale mobile point running on ${port}`))
