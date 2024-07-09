const mongoose = require('mongoose');
const hallSchema = require('./hall.schema');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  mainImg: { type: String, required: true },
  secondImg: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  sellCount: { type: Number, required: true },
  remainCount: { type: Number, required: true },
  basketCount: { type: Number, required: true },
  createdAt: { type: String, required: true },
  categoryName: { type: String, required: true },
  language: { type: String, required: true },
  hall: { type: hallSchema, required: true },
  detailImg: { type: String, required: true }
});

module.exports = eventSchema;
