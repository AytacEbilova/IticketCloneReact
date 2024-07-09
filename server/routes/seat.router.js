const express=require('express');
const endpoints=require('../constants/endpoints');
const seat_controller=require('../controllers/seat.controlller');
const seat_router=express.Router();

seat_router.get(endpoints.seats.getAll,seat_controller.getAll);
seat_router.get(endpoints.seats.getOne,seat_controller.getOne);
seat_router.delete(endpoints.seats.delete,seat_controller.delete);
seat_router.post(endpoints.seats.post,seat_controller.post);
seat_router.patch(endpoints.seats.update,seat_controller.update);

module.exports=seat_router;