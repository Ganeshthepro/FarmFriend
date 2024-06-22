import { Schema, model, models } from "mongoose";

const orderSchema = new Schema({
  line_items: Object,
  name: String,
  email: String,
  city: String,
  pinCode: String,
  streetAddress: String,
  country: String,
  paid: Boolean
}, { timestamps: true }); // Add timestamps option here

const order = models.order || model('order', orderSchema);

export default order;
