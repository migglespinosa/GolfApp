const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Golfer = require('./golfer.model');

const outingSchema = new Schema({
  creator: {type: Schema.Types.ObjectId, ref: 'Golfer'},
  pending: {
    type: Boolean,
    required: true
  },
  date: {
    type: String,
    required: true
    },
  location: {
    type: String,
    required: true
  },
  participants: [{participant: {type: Schema.Types.ObjectId, ref: 'Golfer'},
                  confirmed: {type: Boolean}}]
})

const Outing = mongoose.model('Outing', outingSchema);

module.exports = Outing;
