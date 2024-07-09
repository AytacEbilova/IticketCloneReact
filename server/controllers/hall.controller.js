const Halls = require('../models/hall.model');

const hall_controller = {
  getAll: async (req, res) => {
    try {
      const halls = await Halls.find({});
      if (halls.length > 0) {
        res.status(200).send({
          message: "success",
          data: halls,
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

  getOne: async (req, res) => {
    const { id } = req.params;
    try {
      const hall = await Halls.findById(id);
      if (hall) {
        res.status(200).send({
          message: "success",
          data: hall,
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
      const deleteHall = await Halls.findByIdAndDelete(id);
      res.status(200).send({
        message: "delete",
        deleteEvent: deleteHall,
      });
    } catch (error) {
      res.status(500).send({
        message: error.message,
        error: true,
      });
    }
  },

  post: async (req, res) => {
    const { location, contactPhone, email, name, rows, cols } = req.body;

    if (!location || !contactPhone || !email || !name || !rows || !cols) {
      return res.status(400).send({ error: true, message: "All fields are required." });
    }

  
    const seats = [];
    for (let row = 0; row < rows; row++) {
      const seatRow = [];
      for (let col = 0; col < cols; col++) {
        seatRow.push({
          row: row + 1,
          col: col + 1,
          type: 'standard', 
          isReserved: false 
        });
      }
      seats.push(seatRow);
    }

    try {
      const newHall = new Halls({
        location,
        contactPhone,
        email,
        name,
        rows,
        cols,
        seats
      });
      await newHall.save();
      console.log("Hall created successfully:", newHall);
      res.status(201).send({ error: false, message: "Hall created", newHall });
    } catch (error) {
      console.error("Error saving hall:", error);
      res.status(500).send({ error: true, message: error.message });
    }
  },

  update: async (req, res) => {
    const { id } = req.params;
    try {
      await Halls.findByIdAndUpdate(id, req.body);
      const updated = await Halls.findById(id);
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
};

module.exports = hall_controller;
