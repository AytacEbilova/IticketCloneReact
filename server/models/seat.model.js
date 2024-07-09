const mongoose=require('mongoose');
const seatSchema = require('../schemas/seat.schema');
const Seats = mongoose.model("Seats", seatSchema);

module.exports=Seats;