const mongoose=require('mongoose')
const ticketSchema=new mongoose.Schema({
    eventId:[{ type: mongoose.Schema.Types.ObjectId, ref: "Events" }],
   seat:{type:String,required:true},
   price:{type:Number,required:true}
   });

   module.exports=ticketSchema;