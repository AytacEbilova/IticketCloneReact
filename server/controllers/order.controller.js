
const sendTicketByMail = require('../helpers/sendTicketByMail');
const Orders = require('../models/order.model')
const order_controllers = {
  getAll: async (req, res) => {
    try {
      const orders = await Orders.find({});
      if (orders.length > 0) {
        res.status(200).send({
          message: "success",
          data: orders,
        });
      } else {
        res.status(204).send({
          message: "empty data",
          data: null,
        });
      }
    } catch (error) {
      res.status(204).send({
        message: error.message,
        error: true,
      });
    }
  },

  getOne: async (req, res) => {
    const { id } = req.params;
    try {
      const order = await Orders.findById(id);
      if (order) {
        res.status(200).send({
          message: "success",
          data: order,
        });
      } else {
        res.status(204).send({
          message: "empty data",
          data: null,
        });
      }
    } catch (error) {
      res.status(500).send({
        message: error.message,
        error: true,
      });
    }
  },
  delete: async (req, res) => {
    const { id } = req.params;
    try {
      const deleteOrder = await Orders.findByIdAndDelete(id);
      res.status(200).send({
        message: "delete",
        deleteEvent: deleteOrder,
      });
    } catch (error) {
      res.status(500).send({
        message: error.message,
        error: true,
      });
    }
  },
  post: async (req, res) => {
    try {
      const newOrder = new Orders(req.body);
      await newOrder.save();
      console.log("Order created successfully:", newOrder);
      res.status(201).send({ error: false, message: "Order created", newOrder });
    } catch (error) {
      console.error("Error saving user:", error);
      res.status(500).send({ error: true, message: error.message });
    }
  },
  orderMail: async (req, res) => {
    try {
      console.log(req.body)
      if (!req.body.email) {
        console.error('Email is missing');
        return res.status(400).send('Email is required');
      }
      console.log(req.body)
      sendTicketByMail(req.body.email,req.body.content);
      return res.status(200).send('Email sent');
    } catch (error) {
      res.send({
        error: error,
      });
    }

  },
  
}

module.exports = order_controllers;