const mongoose=require('mongoose');
const orderSchema=require('../schemas/order.schema')


const Orders=mongoose.model("Orders",orderSchema);

module.exports=Orders;
