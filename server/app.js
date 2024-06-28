const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt=require('bcrypt');
app.use(bodyParser.json());
app.use(cors());
const mongoose = require("mongoose");
require("dotenv").config();
const Joi = require('joi');
const { default: sendVerifyEmail } = require("./helpers/sendMail");

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

//schema
const usersSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  mobile: { type: String, required: true },
  email:{ type: String, required: true },
  password: { type: String, required: true },
  confirmPassword:{ type: String, required: true }
});

const loginSchema = new mongoose.Schema({
    email:{type:String,required:true},
    password:{type:String,required:true}
})
const eventSchema=new Schema({
  title:{type:String,require:true},
  mainImg:{type:String,require:true},
  secondImg:{type:String,require:true},
  price:{type:String,require:true},
  description:{type:String,require:true},
  sellCount:{type:Number,require:true},
  remainCount:{type:Number,require:true},
  basketCount:{type:Number,require:true},
  createdAt:{type:String,require:true}  ,
  categoryName:{type:String,require:true},
  location:{type:String,require:true},
  language:{type:String,require:true}
});

const ticketSchema=new Schema({
 eventId:[{ type: mongoose.Schema.Types.ObjectId, ref: "Events" }],
 customerId:[{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }]
});



//models
const Users = mongoose.model("Users", usersSchema);
const Login=mongoose.model("Login",loginSchema)
const Events=mongoose.model("Events",eventSchema)
const Tickets=mongoose.model("Tickets",ticketSchema)

//user crud
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
app.post("/users", async (req, res) => {
  console.log("Received request with body:", req.body);

  const { error } = UserValidations.validate(req.body);
  if (error) {
    const errorMessage = error.details.map(detail => detail.message).join(', ');
    console.log("Validation error:", errorMessage);
    return res.status(400).send({
      error: true,
      message: errorMessage,
    });
  }

  try {
    const duplicateEmail = await Users.findOne({ email: req.body.email });
    if (duplicateEmail) {
      console.log("Email already in use:", req.body.email);
      return res.status(400).send({ error: true, message: "Email already in use" });
    }

    //send email
    sendVerifyEmail(newUser.email,);
    const newUser = new Users(req.body);
    await newUser.save();
    console.log("User created successfully:", newUser);
    res.status(201).send({ error: false, message: "User created", newUser });
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).send({ error: true, message: error.message });
  }
});


//login crud
app.get("/login", async (req, res) => {
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
});
app.post("/login", async (req, res) => {
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
});

//events crud
app.get("/events", async (req, res) => {
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
});
app.get("/events/:id", async (req, res) => {
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
});
app.delete("/events/:id", async (req, res) => {
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
});

app.post("/events", async (req, res) => {
  try {
    const newEvent = new Events(req.body);
    await newEvent.save();
    console.log("Event created successfully:", newEvent);
    res.status(201).send({ error: false, message: "Event created", newEvent });
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).send({ error: true, message: error.message });
  }
});
app.put("/events",async(req,res)=>{
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
})



//ticket crud
app.get("/tickets", async (req, res) => {
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
});
app.get("/tickets/:id", async (req, res) => {
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
});
app.delete("/tickets/:id", async (req, res) => {
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
});
app.post("/tickets", async (req, res) => {
  try {
    const newTicket = new Tickets(req.body);
    await newTicket.save();
    console.log("Event created successfully:", newTicket);
    res.status(201).send({ error: false, message: "Event created", newTicket });
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).send({ error: true, message: error.message });
  }
});