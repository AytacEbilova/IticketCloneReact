const mongoose=require('mongoose');
const usersSchema=require('../schemas/user.schema')
const Users = mongoose.model("Users", usersSchema);

module.exports=Users;