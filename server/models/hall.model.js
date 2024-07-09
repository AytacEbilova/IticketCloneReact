const mongoose=require('mongoose');
const hallSchema = require('../schemas/hall.schema');
const Halls = mongoose.model("Halls", hallSchema);

module.exports=Halls; 