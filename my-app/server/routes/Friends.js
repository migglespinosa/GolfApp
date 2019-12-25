const router = require('express').Router();
let Golfer = require('../models/golfer.model');

router.route('/').get((req, res) => {
  Golfer.find()
    .then(golfers => res.json(golfers))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
