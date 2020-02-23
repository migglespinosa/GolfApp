//import jwt_decode from "jwt-decode";
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

const router = require('express').Router();

let Golfer = require('../models/golfer.model');

router.route('/deleteDifferential').post((req, res) => {

  const token = req.headers.authorization;
  const decoded = jwt.verify(token, keys.secretOrKey);
  const id = decoded._id;
  const differential = req.body.differential;

  Golfer.findOneAndUpdate({_id: id},
    {$pull: {differentials: {date: differential.date}}},
    {new: true})
    .then(golfer => {
      res.send(golfer)
    })
})

router.route('/deleteHandicap').post((req, res) => {

  const token = req.headers.authorization;
  const decoded = jwt.verify(token, keys.secretOrKey);
  const id = decoded._id;
  const handicap = req.body.handicap;


  Golfer.findOneAndUpdate({_id: id},
    {$pull: {handicap: {date: handicap.date}}},
    {new: true})
    .then(golfer => {
      res.send(golfer)
    })
})

router.route('/addDifferntial').post((req, res) => {

  const token = req.headers.authorization;
  const differential = req.body;
  const decoded = jwt.verify(token, keys.secretOrKey);
  const id = decoded._id;

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
  const id = decoded._id;

    Golfer.updateOne({_id: id}, { $push: {handicap: handicap}}, function(err, raw) {
      if (err) {
        res.send(err);
      }
      res.send(raw);
    });
});


module.exports = router;
