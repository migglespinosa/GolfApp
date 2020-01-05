//import jwt_decode from "jwt-decode";
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

const router = require('express').Router();

let Golfer = require('../models/golfer.model');

router.route('/addDifferntial').post((req, res) => {

  const token = req.headers.authorization;
  const differential = req.body;
  const decoded = jwt.verify(token, keys.secretOrKey);
  const id = decoded.id;

    Golfer.updateOne({_id: id}, { $push: {differentials: differential}}, function(err, raw) {
      if (err) {
        res.send(err);
      }
      res.send(raw);
    })
  })

router.route('/addHandicap').post((req, res) => {

  const token = req.headers.authorization;
  const handicap = req.body;
  const decoded = jwt.verify(token, keys.secretOrKey);
  const id = decoded.id;

    Golfer.updateOne({_id: id}, { $push: {handicap: handicap}}, function(err, raw) {
      if (err) {
        res.send(err);
      }
      res.send(raw);
    });
});


module.exports = router;
