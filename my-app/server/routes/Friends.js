const router = require('express').Router();
let Golfer = require('../models/golfer.model');

router.route('/search').post((req, res) => {
  const username = req.body.username
  console.log("search req: ", req);
  console.log("search username: ", username);
  Golfer.findOne({ username })
    .then(golfer => {
      if(golfer){
        res.send({exists: true});
      }
      else{
        res.send({exists: false});
      }
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
