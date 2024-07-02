const mongoose=require('mongoose')

const eventSchema=new mongoose.Schema({
    title:{type:String,require:true},
    mainImg:{type:String,require:true},
    secondImg:{type:String,require:true},
    price:{type:Number,require:true},
    description:{type:String,require:true},
    sellCount:{type:Number,require:true},
    remainCount:{type:Number,require:true},
    basketCount:{type:Number,require:true},
    createdAt:{type:String,require:true}  ,
    categoryName:{type:String,require:true},
    location:{type:String,require:true},
    language:{type:String,require:true},
    detailImg:{type:String,require:true}
  });
  
  module.exports=eventSchema;