const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(bodyParser.json());
app.use(cors());
const mongoose = require("mongoose");
require("dotenv").config();
const Joi = require('joi');
const PORT = process.env.PORT || 3000;
const DB = process.env.DB_URL;

mongoose.connect(DB).then(() =>
  app.listen(PORT, () => {
    console.log(`Example app listening on port:http://localhost:${PORT}`);
  })
);

const { Schema } = mongoose;
//validation
const UserValidations = Joi.object({
    firstName:Joi.string()
    .min(2)
    .max(30)
    .required(),
    lastName: Joi.string()
    .min(5)
    .max(30)
    .required(),
    mobile:Joi.number()
    .integer(),
    email:Joi.string()
    .min(5)
    .max(30).email()
    .required(),
    password: Joi.string()
    .min(4).max(10)
    .required(),
    confirmPassword: Joi.ref('password')
}).with('password', 'confirmPassword');


const usersSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  mobile: { type: String, required: true },
  email:{ type: String, required: true },
  password: { type: String, required: true },
  confirmPassword:{ type: String, required: true }
});
const Users = mongoose.model("Users", usersSchema);

app.get("/users", async (req, res) => {
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
});
app.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Users.findById(id);
    if (product) {
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
});
app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleteUsers = await Users.findByIdAndDelete(id);
    res.status(200).send({
      message: "delete",
      deleteUsers:deleteUsers ,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      error: true,
    });
  }
});
app.post("/users",(req,res,next)=>{
    const {error}=UserValidations.validate(req.body);
    if(!error){
        next();
    }
    else{
        const{details}=error;
        res.send({
            isValidate:false,
            message:details[0].message
        })
        
        
    }
}, async (req, res) => {
  const newUser = new Users(req.body);
  try {
    await newUser.save();
    res.status(200).send({
      message: "posted",
      newUser: newUser,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      error: true,
    });
  }
});