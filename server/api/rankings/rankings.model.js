'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var RankingsSchema = new mongoose.Schema({
  name: String,
  score: Number,
  potentialPoints: Number,
  pickPercentage: Number,
  pickedChampion: Array,
  tieBreaker: Number,
  owner: String,
  bracket: Array,
  rank: Number,
  lastRank: Number
});

export default mongoose.model('Rankings', RankingsSchema);
