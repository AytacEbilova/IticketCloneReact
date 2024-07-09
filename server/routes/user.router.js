const express=require('express');
const endpoints=require('../constants/endpoints');
const user_controller=require('../controllers/user.controllers');
const user_middleware=require('../middlewares/user.middleware');
const user_router=express.Router();

user_router.get(endpoints.users.getAll,user_controller.getAll);
user_router.get(endpoints.users.getOne,user_controller.getOne);
user_router.delete(endpoints.users.delete,user_controller.delete);
user_router.post(endpoints.users.post,user_middleware,user_controller.post);
user_router.patch(endpoints.users.update,user_controller.update);
// user_router.get(endpoints.users.verify,user_controller.verify);
user_router.post(endpoints.users.update,user_controller.updatePass);


module.exports=user_router;