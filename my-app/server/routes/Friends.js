const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const router = require('express').Router();

let Golfer = require('../models/golfer.model');

router.route('/search').post((req, res) => {
  const username = req.body.username
  Golfer.findOne({ username })
    .then(golfer => {

      if(golfer){
        res.send({exists: true,
                  id: golfer._id});
      }
      else{
        res.send({exists: false});
      }
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/sendRequest').post((req, res) => {

  const token = req.headers.authorization;
  const decoded = jwt.verify(token, keys.secretOrKey);
  const id = decoded._id;
  const username = req.body.username;


  Golfer.findOne({ username })
    .then(golfer => {
      Golfer.updateOne({_id: id}, { $push: {sentRequests: golfer._id}}, function(err, raw) {
        if (err) {
          res.send(err);
        }
        res.send(raw);
      })
    })

  Golfer.updateOne({username: username}, { $push: {receivedRequests: id}}, function(err, raw) {
    if (err) {
      res.send(err);
    }
  })

});

router.route('/declineRequest').post((req, res) => {

  const token = req.headers.authorization;
  const decoded = jwt.verify(token, keys.secretOrKey);
  const id = decoded._id;
  const username = req.body.username;

  console.log("id: ", id)

  Golfer.findOne({ username })
    .then(golfer => {
      console.log("/declineRequest golfer: ", golfer)
      console.log("golfer._id: ", golfer._id)
      Golfer.updateOne({_id: id}, { $pull: {receivedRequests: golfer._id}}, function(err, raw) {
        if (err) {
          res.send(err);
        }
        res.send(raw);
      })
    })

  Golfer.updateOne({username: username}, { $pull: {sentRequests: id}}, function(err, raw) {
    if (err) {
      res.send(err);
    }
  })

})

router.route('/acceptRequest').post((req, res) => {


  const token = req.headers.authorization;
  const decoded = jwt.verify(token, keys.secretOrKey);
  const id = decoded._id;
  const username = req.body.username;


  Golfer.findOne({ username })
    .then(golfer => {
      Golfer.updateOne({_id: id}, { $pull: {receivedRequests: golfer._id}}, function(err, raw) {
        if (err) {
          res.send(err);
        }
      })
      Golfer.updateOne({_id: id}, { $push: {friends: golfer._id}}, function(err, raw) {
        if (err) {
          res.send(err);
        }
        res.send(raw);
      })
    })

  Golfer.updateOne({username: username}, { $pull: {sentRequests: id}}, function(err, raw) {
    if (err) {
      res.send(err);
    }
  })

  Golfer.updateOne({username: username}, { $push: {friends: id}}, function(err, raw) {
    if (err) {
      res.send(err);
    }
  })

})

module.exports = router;
