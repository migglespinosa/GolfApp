const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const outingSchema = new Schema({
  date: {
    type: String,
    required: true
    },
  location: {
    type: String,
    required: true
  },
  participants: [{type: Schema.Types.ObjectId, ref: 'Golfer'}]
})

const Outing = mongoose.model('Outing', outingSchema);

module.exports = Outing;
