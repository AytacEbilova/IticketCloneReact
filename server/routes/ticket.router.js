const express=require('express');
const endpoints=require('../constants/endpoints');
const ticket_controller=require('../controllers/ticket.controllers');
const ticket_router=express.Router();

ticket_router.get(endpoints.tickets.getAll,ticket_controller.getAll);
ticket_router.get(endpoints.tickets.getOne,ticket_controller.getOne);
ticket_router.delete(endpoints.tickets.delete,ticket_controller.delete);
ticket_router.post(endpoints.tickets.post,ticket_controller.post);
// ticket_router.patch(endpoints.tickets.update,ticket_controller.update);

module.exports=ticket_router;