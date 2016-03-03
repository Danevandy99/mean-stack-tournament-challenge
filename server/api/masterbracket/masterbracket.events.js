/**
 * Masterbracket model events
 */

'use strict';

import {EventEmitter} from 'events';
var Masterbracket = require('./masterbracket.model');
var MasterbracketEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
MasterbracketEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Masterbracket.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    MasterbracketEvents.emit(event + ':' + doc._id, doc);
    MasterbracketEvents.emit(event, doc);
  }
}

export default MasterbracketEvents;
