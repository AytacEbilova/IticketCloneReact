const mongoose = require('mongoose');
const { type } = require('server/reply');

const couponSchema = new mongoose.Schema({
  name: { type: String, required: true },
  percentage: { type: Number, required: true },
  expireDate: { type: String, required: true },
  limit:{type:Number, required: true},
  usedLimit:{type:Number, required: true}
});

module.exports = couponSchema;
