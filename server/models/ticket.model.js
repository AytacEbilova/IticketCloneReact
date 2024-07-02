const mongoose=require('mongoose');
const ticketSchema=require('../schemas/ticket.schema')
const Tickets=mongoose.model("Tickets",ticketSchema);

module.exports=Tickets;
