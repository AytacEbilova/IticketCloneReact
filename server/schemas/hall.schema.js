const mongoose = require('mongoose');
const seatSchema = require('./seat.schema');

const hallSchema = new mongoose.Schema({
  location: { type: String, required: true },
  contactPhone: { type: String, required: true },
  email: { type: String, required: true },
  name: { type: String, required: true },
  rows: { type: Number, required: true },
  cols: { type: Number, required: true },
  seats: { type: [[seatSchema]], required: true }
});

module.exports = hallSchema;
