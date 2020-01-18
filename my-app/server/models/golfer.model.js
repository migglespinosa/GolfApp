const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const golferSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  password: {
    type: String,
    required: true,
    unique: false,
    trim: true,
    minlength: 3
  },
  first_name: {
    type: String,
    required: true,
    unique: false,
    trim: true
  },
  last_name: {
    type: String,
    required: true,
    unique: false,
    trim: true
  },
  friends: [{type: Schema.Types.ObjectId, ref: 'Golfer'}],
  differentials: {
    type: Object,
    required: false,
    unique: false,
  },
  handicap: {
    type: Object,
    required: false,
    unique: false,
  },
  outings: {
    type: Object,
    required: false,
    unique: false,
  },
  sentRequests: [{type: Schema.Types.ObjectId, ref: 'Golfer'}],
  receivedRequests: [{type: Schema.Types.ObjectId, ref: 'Golfer'}],
}, {
  timestamps: true,
});

const Golfer = mongoose.model('Golfer', golferSchema);

module.exports = Golfer;
