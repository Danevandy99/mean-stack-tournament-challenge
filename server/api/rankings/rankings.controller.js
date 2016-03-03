/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/rankings              ->  index
 * POST    /api/rankings              ->  create
 * GET     /api/rankings/:id          ->  show
 * PUT     /api/rankings/:id          ->  update
 * DELETE  /api/rankings/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Rankings from './rankings.model';
import Bracket from '../bracket/bracket.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.saveAsync()
      .spread(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

export function getRankings(req, res) {
  Bracket.find({}).sort('-score').exec(function(err, rankings) { 
    if (err) {
      throw err;
    }
    var lastRank = 0;
    var lastScore = 0;
    for (var i = 0; i < rankings.length; i++) {
      var score = rankings[i].score;
      if (score === lastScore) {
        rankings[i].rank = lastRank;
      } else {
        lastScore = score;
        lastRank = i + 1;
        rankings[i].rank = i + 1;
      }
    }
    res.status(200).json(rankings);
  });
}

// Gets a list of Rankingss
export function index(req, res) {
  Rankings.findAsync()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Rankings from the DB
export function show(req, res) {
  Rankings.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Rankings in the DB
export function create(req, res) {
  Rankings.createAsync(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Rankings in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Rankings.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Rankings from the DB
export function destroy(req, res) {
  Rankings.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
