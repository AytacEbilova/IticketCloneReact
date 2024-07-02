const mongoose=require('mongoose')

const usersSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    mobile: { type: String, required: true },
    email:{ type: String, required: true },
    password: { type: String, required: true },
    confirmPassword:{ type: String, required: true }
  });

  module.exports=usersSchema;