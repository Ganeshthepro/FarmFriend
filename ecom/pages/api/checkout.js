// checkout.js
import mongooseConnect from "@/lib/mongoose";
import order from "@/models/order";
import { Product } from "@/models/products";

const stripe = require('stripe')(process.env.STRIPE_SK);

export default async function handler(req, res) {
  try {
    await mongooseConnect(); // Connect to MongoDB

    if (req.method !== 'POST') {
      res.status(405).json({ error: 'Method Not Allowed' });
      return;
    }

    const { name, email, city, pinCode, streetAddress, country, cartProducts } = req.body;
    const productsIds = cartProducts;
    const uniqueIds = [...new Set(productsIds)];
    const productsInfos = await Product.find({ _id: { $in: uniqueIds } });

    let line_items = [];
    for (const productId of uniqueIds) {
      const productInfo = productsInfos.find(p => p._id.toString() === productId);
      const quantity = productsIds.filter(id => id === productId)?.length || 0;

      if (quantity > 0 && productInfo) {
        line_items.push({
          quantity,
          price_data: {
            currency: 'USD',
            product_data: {
              name: productInfo.title
            },
            unit_amount: productInfo.price * quantity, // Fixed: Remove the multiplication by 100
          },
        });
      }
    }

    const orderDoc = await order.create({
      line_items,
      name,
      email,
      city,
      pinCode,
      streetAddress,
      country,
      paid: false,
    });

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: 'payment',
      customer_email: email,
      success_url: process.env.PUBLIC_URL + '/cart?success=1',
      cancel_url: process.env.PUBLIC_URL + '/cart?canceled=1',
      metadata: {
        orderId: orderDoc._id.toString(),
        test: 'ok'
      },
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Error in /api/checkout:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}