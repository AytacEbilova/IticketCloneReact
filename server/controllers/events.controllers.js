
const Events = require('../models/event.model')

const event_controller = {
  getAll: async (req, res) => {
    try {
      console.error("WORKINGGGGGGGG")
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
  getOne: async (req, res) => {
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
  delete: async (req, res) => {
    const { id } = req.params;
    try {
      const deleteEvent = await Events.findByIdAndDelete(id);
      res.status(200).send({
        message: "delete",
        deleteEvent: deleteEvent,
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
      const {
        title,
        mainImg,
        secondImg,
        price,
        description,
        sellCount,
        remainCount,
        basketCount,
        createdAt,
        categoryName,
        language,
        hall,
        detailImg
      } = req.body;
  
      if (
        !title || !mainImg || !secondImg || !price || !description ||
        sellCount === undefined || remainCount === undefined || basketCount === undefined ||
        !createdAt || !categoryName || !language || !hall || !detailImg
      ) {
        return res.status(400).json({ error: true, message: "Required fields are missing" });
      }
  
      const newEvent = new Events({
        title,
        mainImg,
        secondImg,
        price,
        description,
        sellCount,
        remainCount,
        basketCount,
        createdAt,
        categoryName,
        language,
        hall,
        detailImg
      });
  
      await newEvent.save();
      res.status(201).json({ error: false, message: "Event created successfully", newEvent });
    } catch (error) {
      console.error("Error creating event:", error);
      res.status(500).json({ error: true, message: error.message });
    }
  },
  

  update: async (req, res) => {
    const { id } = req.params;
    try {
      const updatedEvent = await Events.findByIdAndUpdate(id, req.body, { new: true });

      if (updatedEvent) {
        res.status(200).json({ message: "Event updated successfully", data: updatedEvent });
      } else {
        res.status(404).json({ message: "Event not found", error: true });
      }
    } catch (error) {
      res.status(500).json({ message: error.message, error: true });
    }
  }
};


module.exports = event_controller;