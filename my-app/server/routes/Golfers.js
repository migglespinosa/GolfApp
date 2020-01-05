const router = require('express').Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const keys = require("../config/keys");
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");


let Golfer = require('../models/golfer.model');


router.route('/').get((req, res) => {
  Golfer.find()
    .then(golfers => res.json(golfers))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.post("/login", (req, res) => {
  // Form validation
const { errors, isValid } = validateLoginInput(req.body);

// Check validation
if (!isValid) {
  return res.status(400).json(errors);
}

const username = req.body.username;
const password = req.body.password;

// Find user by email
  Golfer.findOne({ username }).then(golfer => {

    // Check if golfer exists
    if (!golfer) {
      return res.status(404).json({ usernotfound: "User not found" });
    }

    console.log("password: ", password);
    console.log("golfer.password", golfer.password);
// Check password
    bcrypt.compare(password, golfer.password).then(isMatch => {
      if (isMatch) {
        console.log("login golfer: ", golfer);
        // User matched
        // Create JWT Payload
        const payload = {
          id: golfer.id,
          username: golfer.username,
          password: golfer.password,
          first_name: golfer.first_name,
          last_name: golfer.last_name,
          friends: golfer.friends,
          differentials: golfer.differentials,
          handicap: golfer.handicap,
          outings: golfer.outings
        };
// Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: token
            });
          }
        );
      } else {
        console.log("!isMatch");
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});


router.route('/register').post((req, res) => {

  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Golfer.findOne({username: req.body.username}).then(golfer => {
    if(golfer){
      return res.status(400).json({ username: "User already exists" });
    }}
  )


  const username = req.body.username;
  const password = req.body.password;
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const friends = req.body.friends ? req.body.friends : [];
  const differentials = req.body.differentials ? req.body.differentials : [];
  const handicap = req.body.handicap ? req.body.handicap : [];
  const outings = req.body.outings ? req.body.outings : [];

  const newGolfer = new Golfer({
    username,
    password,
    first_name,
    last_name,
    friends,
    differentials,
    handicap,
    outings
  });

  Golfer.findOne({username}).then(golfer => {

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newGolfer.password, salt, (err, hash) => {
          if (err) throw err;
          newGolfer.password = hash;
          newGolfer
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
  });
});

module.exports = router;