/**
 * Rankings model events
 */

'use strict';

import {EventEmitter} from 'events';
var Rankings = require('./rankings.model');
var RankingsEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
RankingsEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Rankings.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    RankingsEvents.emit(event + ':' + doc._id, doc);
    RankingsEvents.emit(event, doc);
  }
}

export default RankingsEvents;
