const express=require('express');
const endpoints=require('../constants/endpoints');
const login_controllers=require('../controllers/login.controllers');
const login_router=express.Router();

login_router.get(endpoints.login.getAll,login_controllers.getAll);
login_router.post(endpoints.login.post,login_controllers.post);

module.exports=login_router;