const { default: mongooseConnect } = require("@/lib/mongoose");
const { default: Order } = require("@/models/order");
export default async function handler(req,res){
    await mongooseConnect()
    res.json(await Order.find().sort({createdAt:-1}))
}