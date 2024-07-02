
const Tickets=require('../models/ticket.model')
const ticket_controller={
    getAll:async (req, res) => {
        try {
          const tickets = await Tickets.find({});
          if (tickets.length > 0) {
            res.status(200).send({
              message: "success",
              data: tickets,
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
    getOne:async (req, res) => {
        const { id } = req.params;
        try {
          const ticket = await Tickets.findById(id);
          if (ticket) {
            res.status(200).send({
              message: "success",
              data: ticket,
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
    delete:async (req, res) => {
        const { id } = req.params;
        try {
          const deleteTicket = await Tickets.findByIdAndDelete(id);
          res.status(200).send({
            message: "delete",
            deleteEvent:deleteTicket ,
          });
        } catch (error) {
          res.status(500).send({
            message: error.message,
            error: true,
          });
        }
      },
    post:async (req, res) => {
        try {
          const newTicket = new Tickets(req.body);
          await newTicket.save();
          console.log("Event created successfully:", newTicket);
          res.status(201).send({ error: false, message: "Event created", newTicket });
        } catch (error) {
          console.error("Error saving user:", error);
          res.status(500).send({ error: true, message: error.message });
        }
      }
  
}

module.exports=ticket_controller;