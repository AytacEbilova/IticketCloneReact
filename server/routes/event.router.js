const express=require('express');
const endpoints=require('../constants/endpoints');
const event_controller=require('../controllers/events.controllers');
const event_router=express.Router();

event_router.get(endpoints.events.getAll,event_controller.getAll);
event_router.get(endpoints.events.getOne,event_controller.getOne);
event_router.delete(endpoints.events.delete,event_controller.delete);
event_router.post(endpoints.events.post,event_controller.post);
event_router.patch(endpoints.events.update,event_controller.update);

module.exports=event_router;