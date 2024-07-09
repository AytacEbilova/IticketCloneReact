const mongoose = require('mongoose')
const seatSchema = new mongoose.Schema({
    row: { type: Number, required: true },
    col: { type: Number, required: true },
    type: { type: String, enum: ['vip', 'standard', 'silver', 'gold'], default: 'standard' },
    isReserved: { type: Boolean, default: false }
});

module.exports = seatSchema