const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

const port = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.cg4wmwy.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const ProductsCollection = client.db('resaleMobilePoint').collection('products');
        const bookingsCollection = client.db('resaleMobilePoint').collection('bookings');


        app.get("/products", async (req, res) => {
            const category = req.query.category;
            let query = {};
            if (category) {
                query = {
                    category: category
                };
            }
            const options = await ProductsCollection.find(query).toArray();
            res.send(options);
        });

        app.post('/products', async (req, res) => {
            const addItem = req.body;
            const result = await ProductsCollection.insertOne(addItem);
            res.send(result);
        });


        app.post('/bookings', async (req, res) => {
            const booking = req.body;
            console.log(booking);
            const query = {booking} 

            const alreadyBooked = await bookingsCollection.find(query).toArray();

            if (alreadyBooked.length) {
                const message = `You already have a booking on ${booking.appointmentDate}`
                return res.send({ acknowledged: false, message })
            }

            const result = await bookingsCollection.insertOne(booking);
            res.send(result);
        });


    }
    finally {

    }
}
run().catch(console.log);


app.get('/', async (req, res) => {
    res.send('resale mobile point server is running');
})

app.listen(port, () => console.log(`resale mobile point running on ${port}`))
