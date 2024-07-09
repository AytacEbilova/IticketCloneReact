const express=require('express');
const endpoints=require('../constants/endpoints');
const coupon_controller=require('../controllers/coupon.controllers')
const coupon_router=express.Router();

coupon_router.get(endpoints.coupons.getAll,coupon_controller.getAll);
coupon_router.get(endpoints.coupons.getOne,coupon_controller.getOne);
coupon_router.delete(endpoints.coupons.delete,coupon_controller.delete);
coupon_router.post(endpoints.coupons.post,coupon_controller.post);
coupon_router.patch(endpoints.coupons.update,coupon_controller.update);
module.exports=coupon_router;