const mongoose=require('mongoose');
const couponSchema = require('../schemas/coupon.schema');
const Coupon = mongoose.model("Coupon", couponSchema);

module.exports=Coupon; 