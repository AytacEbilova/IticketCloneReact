
const Events=require('../models/event.model')
const event_controller={
    getAll:async (req, res) => {
        try {
          const events = await Events.find({});
          if (events.length > 0) {
            res.status(200).send({
              message: "success",
              data: events,
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
          const event = await Events.findById(id);
          if (event) {
            res.status(200).send({
              message: "success",
              data: event,
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
          const deleteEvent = await Events.findByIdAndDelete(id);
          res.status(200).send({
            message: "delete",
            deleteEvent:deleteEvent ,
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
          const newEvent = new Events(req.body);
          await newEvent.save();
          console.log("Event created successfully:", newEvent);
          res.status(201).send({ error: false, message: "Event created", newEvent });
        } catch (error) {
          console.error("Error saving user:", error);
          res.status(500).send({ error: true, message: error.message });
        }
      },
    update:async(req,res)=>{
        const { id } = req.params;
        try {
          await Events.findByIdAndUpdate(id, req.body);
          const updated = await Events.findById(id);
          res.send({
            message: "updated",
            response: updated,
          });
        } catch (error) {
          res.status(500).send({
            message: error,
            error: true,
          });
        }
      }
}

module.exports=event_controller;