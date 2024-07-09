
const Coupon=require('../models/coupon.model')
const coupon_controller={
    getAll:async (req, res) => {
        try {
          const coupons = await Coupon.find({});
          if (coupons.length > 0) {
            res.status(200).send({
              message: "success",
              data: coupons,
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
          const coupon = await Coupon.findById(id);
          if (coupon) {
            res.status(200).send({
              message: "success",
              data: coupon,
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
          const deleteCoupon = await Coupon.findByIdAndDelete(id);
          res.status(200).send({
            message: "delete",
            deleteEvent:deleteCoupon ,
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
          const newCoupon = new Coupon(req.body);
          await newCoupon.save();
          console.log("Coupon created successfully:", newCoupon);
          res.status(201).send({ error: false, message: "Coupon created", newCoupon });
        } catch (error) {
          console.error("Error saving user:", error);
          res.status(500).send({ error: true, message: error.message });
        }
      },
      update: async (req, res) => {
        const { id } = req.params;
        try {
          const updatedCoupon = await Coupon.findByIdAndUpdate(id, req.body, { new: true });
    
          if (updatedCoupon) {
            res.status(200).json({ message: "Coupon updated successfully", data: updatedCoupon });
          } else {
            res.status(404).json({ message: "Coupon not found", error: true });
          }
        } catch (error) {
          res.status(500).json({ message: error.message, error: true });
        }
      }
  
}

module.exports=coupon_controller;