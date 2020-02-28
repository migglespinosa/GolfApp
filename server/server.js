const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require("passport");
const path = require('path');

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

if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join('../client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build/index.html'));
  });
}

const connection = mongoose.connection;

connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})


// Passport middleware
app.use(passport.initialize());

const golferRouter = require('./routes/Golfers');
const calculateRouter = require('./routes/Calculate');
const friendsRouter = require('./routes/Friends');
const outingsRouter = require('./routes/Outings');

app.use('/Golfers', friendsRouter);
app.use('/Golfers', calculateRouter);
app.use('/Golfers', golferRouter);
app.use('/Outings', outingsRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
