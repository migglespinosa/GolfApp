const router = require('express').Router();
let Golfer = require('../models/golfer.model');

const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");


router.route('/').get((req, res) => {
  Golfer.find()
    .then(golfers => res.json(golfers))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  console.log("")
  const username = req.body.username;
  const password = req.body.password;
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const friends = req.body.friends ? req.body.friends : [];
  const differntials = req.body.differntials ? req.body.differntials : [];
  const handicap = req.body.handicap ? req.body.handicap : [];
  const outings = req.body.outings ? req.body.outings : [];

  const newGolfer = new Golfer({
    username,
    password,
    first_name,
    last_name,
    friends,
    differntials,
    handicap,
    outings
  });

  newGolfer.save()
    .then(() => res.json('Golfer added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
