const mongoose=require('mongoose')
const ticketSchema=new mongoose.Schema({
    eventId:[{ type: mongoose.Schema.Types.ObjectId, ref: "Events" }],
    customerId:[{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }]
   });

   module.exports=ticketSchema