const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require("passport");

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Passport config
require("./config/passport")(passport);


app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);

const connection = mongoose.connection;

connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})


// Passport middleware
app.use(passport.initialize());

const golferRouter = require('./routes/Golfers');

app.use('/Golfers', golferRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
