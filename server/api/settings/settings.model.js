'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var SettingsSchema = new mongoose.Schema({
  poolOpens: Date,
  poolCloses: Date
});

export default mongoose.model('Settings', SettingsSchema);
