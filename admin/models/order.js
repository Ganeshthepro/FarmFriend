// order.js
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
},{
    timeStamps:true
});

const order = models.order || model('order', orderSchema);

export default order;