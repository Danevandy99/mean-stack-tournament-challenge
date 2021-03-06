/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/brackets              ->  index
 * POST    /api/brackets              ->  create
 * GET     /api/brackets/:id          ->  show
 * PUT     /api/brackets/:id          ->  update
 * DELETE  /api/brackets/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Bracket from './bracket.model';

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

// Gets a list of Brackets
export function index(req, res) {
  Bracket.findAsync()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

export function stats(req, res) {
  res.json(Bracket.stats(1024));
}

// Gets a single Bracket from the DB
export function show(req, res) {
  Bracket.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Bracket in the DB
export function create(req, res) {
  Bracket.createAsync(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Bracket in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Bracket.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Bracket from the DB
export function destroy(req, res) {
  Bracket.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
