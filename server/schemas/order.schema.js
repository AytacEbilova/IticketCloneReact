const mongoose=require('mongoose');
const ticketSchema = require('./ticket.schema');

const orderSchema = new mongoose.Schema({
    orderDate:{ type: Date, required: true },
    userId:[{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
    totalPrice:{ type: Number, required: true },
    appliedCoupon:{ type: String},
    name:{ type: String, required: true },
    surname:{ type: String, required: true },
    email:{ type: String, required: true },
    phone:{ type: String, required: true },
    tickets : { type: [[ticketSchema]], required: true}
})

module.exports=orderSchema;