const express=require('express');
const endpoints=require('../constants/endpoints');
const admin_controllers=require('../controllers/admin.controllers');
const admin_router=express.Router();

admin_router.get(endpoints.admin.getAll,admin_controllers.getAll);
admin_router.post(endpoints.admin.post,admin_controllers.post);
admin_router.post(endpoints.admin.login,admin_controllers.login)

module.exports=admin_router;