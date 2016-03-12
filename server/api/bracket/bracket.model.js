'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var BracketSchema = new mongoose.Schema({
  name: String,
  score: Number,
  potentialPoints: Number,
  pickPercentage: Number,
  pickedChampion: Array,
  tieBreaker: Number,
  owner: String,
  bracket: Array,
  rank: Number,
  mover_loser: Number,
  payment_status: String, 
  payer_id: String,
  bracket_active: Boolean,
  txn_id: String 
});

export default mongoose.model('Bracket', BracketSchema);
