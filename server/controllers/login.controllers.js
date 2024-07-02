
const Login=require('../models/login.model')
const login_controllers={
    getAll:async (req, res) => {
        try {
          const login = await Login.find({});
          if (login.length > 0) {
            res.status(200).send({
              message: "success",
              data: login,
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
    post:async (req, res) => {
        console.log("Received request with body:", req.body);
        try {
          const newLogin = new Login(req.body);
          await newLogin.save();
          console.log("User created successfully:", newLogin);
          res.status(201).send({ error: false, message: "User created", newLogin });
        } catch (error) {
          console.error("Error saving user:", error);
          res.status(500).send({ error: true, message: error.message });
        }
      }
}

module.exports=login_controllers;