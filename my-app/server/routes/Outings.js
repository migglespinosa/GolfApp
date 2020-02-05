const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

const router = require('express').Router();

let Golfer = require('../models/golfer.model');
let Outing = require('../models/outing.model');


const isPending = function(participant, index, array){
  console.log("isPending participant.confirmed: ", participant.confirmed)
  return participant.confirmed == false
}

router.route('/addPendingOuting').post((req, res) => {


  const token = req.headers.authorization;
  const decoded = jwt.verify(token, keys.secretOrKey);
  const id = decoded._id;

  const creator = req.body.creator;
  const pending = req.body.pending;
  const date = req.body.date;
  const location = req.body.location;
  const participants = req.body.participants;

  const pendingOuting = new Outing({
    creator,
    pending,
    date,
    location,
    participants
  });

  pendingOuting.save()

  participants.forEach((participant) => {
    Golfer.updateOne({_id: participant.participant}, { $push: {pendingOutings: pendingOuting}}, function(err, raw) {
      if (err) {
        res.send(err);
      }
    })
  });
});

router.route('/:id').get((req, res) => {

  Outing.findById(req.params.id)
    .populate("participants.participant")
    .then(outing => {
      res.send(outing)
    })
    .catch(err => res.status(400).json('Error!: ' + err));
});

router.route('/GolferPending/:id').get((req, res) =>{
  Golfer.findById(req.params.id)
    .populate("pendingOutings")
    .then(golfer => {
      res.send(golfer.pendingOutings)
    })
    .catch(err => res.status(400).json('Error!: ' + err));
});

/*
router.route('/:id').put((req, res) => {

  Outing.findById(req.params.id)
    .populate("participants.participant")
    .then(outing => {
      res.send(outing)
    })
    .catch(err => res.status(400).json('Error!: ' + err));
});
*/

router.route('/:id').put((req, res) => {

  Outing.findOneAndUpdate({_id: req.params.id, participants:
    {$elemMatch: {_id: req.body.participantId}}},
    {$set: {'participants.$.confirmed': true}},
    {new: true})
    .then(outing => {
      console.log("outing activated")
      console.log("!outing.particpants.some(isPending): ", !outing.participants.some(isPending))
      if(!outing.participants.some(isPending)){
        Outing.findOneAndUpdate({_id: req.params.id}, {$set: {pending: false}}, function(err, raw) {
          if (err) {
            res.send(err);
          }
        })
      }
      res.send(outing)
    })
    .catch(err => res.status(400).json('Error!: ' + err));

});

router.route('/').get((req, res) => {

  Outing.find()
    .then(outing => {
      res.send(outing)
    })
    .catch(err => res.status(400).json('Error!: ' + err));

});


module.exports = router;
