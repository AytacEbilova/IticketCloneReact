const Seats=require('../models/seat.model')

const seat_controller={
    getAll:async (req, res) => {
        try {
          const seats = await Seats.find({});
          if (seats.length > 0) {
            res.status(200).send({
              message: "success",
              data: seats,
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
          const seat = await Seats.findById(id);
          if (seat) {
            res.status(200).send({
              message: "success",
              data: seat,
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
          const deleteSeat = await Seats.findByIdAndDelete(id);
          res.status(200).send({
            message: "delete",
            deleteEvent:deleteSeat ,
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
          const newSeat = new Seats(req.body);
          await newSeat.save();
          console.log("Event created successfully:", newSeat);
          res.status(201).send({ error: false, message: "Seat created", newSeat });
        } catch (error) {
          console.error("Error saving user:", error);
          res.status(500).send({ error: true, message: error.message });
        }
      },
    update:async(req,res)=>{
        const { id } = req.params;
        try {
          await Seats.findByIdAndUpdate(id, req.body);
          const updated = await Seats.findById(id);
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

module.exports=seat_controller