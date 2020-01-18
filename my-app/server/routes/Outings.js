const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

const router = require('express').Router();

let Golfer = require('../models/golfer.model');
let Outing = require('../models/outing.model');

router.route('/setOuting').get((req, res) => {
  Golfer.find()
    .then(golfers => res.json(golfers))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
