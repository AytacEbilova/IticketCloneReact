const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;
const DB = process.env.DB_URL;

mongoose.connect(DB).then(() =>
    app.listen(PORT, () => {
      console.log(`Example app listening on port:http://localhost:${PORT}`);
    })
  );

  module.exports=app;