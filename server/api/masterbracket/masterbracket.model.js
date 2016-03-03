'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var MasterbracketSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean,
  bracket: Array
});

export default mongoose.model('Masterbracket', MasterbracketSchema);
