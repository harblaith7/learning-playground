const Stripe = require('stripe')
const express = require('express')
const cors = require('cors')
const stripe = new Stripe("sk_test");

const app = express()
app.use(express.json())
app.use(cors())


app.post('/', async (req, res) => {
    try {
        const { amount } = req.body;
    
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: "usd"
        });

        res.status(200).send(paymentIntent.client_secret);
    } catch (error) {
        res.status(500).json({ statusCode: 500, message: err.message });
    }
})


app.listen(4000, () => {
    console.log("Now running on port 4000")
})