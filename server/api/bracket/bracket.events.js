/**
 * Bracket model events
 */

'use strict';

import {EventEmitter} from 'events';
var Bracket = require('./bracket.model');
var BracketEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
BracketEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Bracket.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    BracketEvents.emit(event + ':' + doc._id, doc);
    BracketEvents.emit(event, doc);
  }
}

export default BracketEvents;
