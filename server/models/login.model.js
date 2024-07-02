const mongoose=require('mongoose');
const loginSchema=require('../schemas/login.schema')


const Login=mongoose.model("Login",loginSchema);

module.exports=Login;
