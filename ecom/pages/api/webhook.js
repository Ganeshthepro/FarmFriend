import { buffer } from "micro";
import { order } from "@/models/order"; // Import your Order model here
const { default: mongooseConnect } = require("@/lib/mongoose");
const stripe = require('stripe')(process.env.STRIPE_SK);
const endpointSecret = "whsec_8e30e2d8624c378f196a449b5220204e6e91fb4dac44846e2a9ed94a53a2236b";

export default async function handler(req, res) {
    await mongooseConnect();
    const sig = req.headers['stripe-signature'];

    let event;
  
    try {
        event = stripe.webhooks.constructEvent(await buffer(req), sig, endpointSecret);
    } catch (err) {
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }
  
    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed':
            const paymentIntent = event.data.object;
            const orderId = paymentIntent.metadata.orderId;
            const paid = paymentIntent.payment_status === 'paid';
            console.log(paymentIntent);
            if (orderId && paid) {
                await order.findByIdAndUpdate(orderId, { paid: true });
            }
            break;
        // ... handle other event types
        default:
            console.log(`Unhandled event type ${event.type}`);
    }
    res.status(200).send('ok');
}

export const config = {
    api: { bodyParser: false }
};
