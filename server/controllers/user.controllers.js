var jwt = require("jsonwebtoken");
// const sendVerifyEmail = require('../helpers/sendMail')
const Users = require('../models/user.model');
const { message } = require("../validations/user.validation");
const user_controller = {
  getAll: async (req, res) => {
    try {
      const users = await Users.find({});
      if (users.length > 0) {
        res.status(200).send({
          message: "success",
          data: users,
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
    console.log(id)
    try {
      const user = await Users.findById(id);
      if (user) {
        res.status(200).send({
          message: "success",
          data: user,
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
      const deleteUsers = await Users.findByIdAndDelete(id);
      res.status(200).send({
        message: "delete",
        deleteUsers: deleteUsers,
      });
    } catch (error) {
      res.status(500).send({
        message: error.message,
        error: true,
      });
    }
  },
  post: async (req, res) => {
    const newUser = new Users(req.body);
    try {
      console.log(newUser);
      const user = await Users.findOne({ email: newUser.email });
      
      if (user) {
        res.status(400).send({
          message: "This email already in use",
        });
      }
      else {

        await newUser.save();
        //token
        // const token = jwt.sign(
        //   { email: newUser.email, id: newUser._id },
        //   process.env.PRIVATE_TOKEN_KEY,
        //   { expiresIn: "1h" }
        // );
        //send email
        //sendVerifyEmail(newUser.email, token);
        res.status(200).send({
          message: "posted",
          newUser: newUser,
        });
      }
    } catch (error) {
      res.status(500).send({
        message: error.message,
        error: true,
      });
    }
  },
  update: async (req, res) => {
    const { id } = req.params;
    try {
      await Users.findByIdAndUpdate(id, req.body);
      const updated = await Users.findById(id);
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
  },
  // verify: async (req, res) => {
  //   const { token } = req.params;
  //   try {
  //     const validToken = jwt.verify(token, process.env.PRIVATE_TOKEN_KEY);
  //     if (validToken) {
  //       await Users.findByIdAndUpdate(validToken.id, { isVerified: true });
  //       res.redirect("http://localhost:5173/");
  //       res.send({
  //         token:validToken
  //       })
  //     } else {
  //       res.send({
  //         message: "invalid token",
  //       });
  //     }
  //   } catch (error) {
  //     res.send({
  //       error: error,
  //     });
  //   }

  // },
  updatePass: (req, res) => {
    const { id, token } = req.params
    const { password } = req.body

    jwt.verify(token, "jwt_secret_key", (err, decoded) => {
      if (err) {
        return res.json({ Status: "Error with token" })
      } else {
        bcrypt.hash(password, 10)
          .then(hash => {
            Users.findByIdAndUpdate({ _id: id }, { password: hash })
              .then(u => res.send({ Status: "Success" }))
              .catch(err => res.send({ Status: err }))
          })
          .catch(err => res.send({ Status: err }))
      }
    })
  }

}

module.exports = user_controller;