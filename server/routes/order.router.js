const express=require('express');
const endpoints=require('../constants/endpoints');
const order_controller=require('../controllers/order.controller');
const order_router=express.Router();

order_router.get(endpoints.orders.getAll,order_controller.getAll);
order_router.get(endpoints.orders.getOne,order_controller.getOne);
order_router.delete(endpoints.orders.delete,order_controller.delete);
order_router.post(endpoints.orders.post,order_controller.post);
order_router.post(endpoints.orders.orderMail,order_controller.orderMail)

module.exports=order_router;