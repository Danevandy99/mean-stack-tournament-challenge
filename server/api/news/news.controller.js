/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/news              ->  index
 * POST    /api/news              ->  create
 * GET     /api/news/:id          ->  show
 * PUT     /api/news/:id          ->  update
 * DELETE  /api/news/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import News from './news.model';

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

// Gets a list of Newss
export function index(req, res) {
  News.findAsync()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single News from the DB
export function show(req, res) {
  News.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new News in the DB
export function create(req, res) {
  News.createAsync(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing News in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  News.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a News from the DB
export function destroy(req, res) {
  News.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
