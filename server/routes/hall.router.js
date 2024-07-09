const express = require('express');
const endpoints = require('../constants/endpoints');
const hall_controller = require('../controllers/hall.controller');
const hall_router = express.Router();

hall_router.get(endpoints.halls.getAll, hall_controller.getAll);
hall_router.get(endpoints.halls.getOne, hall_controller.getOne);
hall_router.delete(endpoints.halls.delete, hall_controller.delete);
hall_router.post(endpoints.halls.post, hall_controller.post);
hall_router.patch(endpoints.halls.update, hall_controller.update);

module.exports = hall_router;
