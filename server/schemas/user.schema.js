const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    mobile: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    confirmPassword: { type: String, required: true },
    birthday: { type: String },
    country: { type: String },
    gender: { type: String },
    balance: { type: Number } 
});

module.exports = usersSchema;
