const mongoose=require('mongoose');
const eventSchema=require('../schemas/event.schema')
const Events=mongoose.model("Events",eventSchema);

module.exports=Events;
