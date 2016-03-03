/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/settings              ->  index
 * POST    /api/settings              ->  create
 * GET     /api/settings/:id          ->  show
 * PUT     /api/settings/:id          ->  update
 * DELETE  /api/settings/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Settings from './settings.model';

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

// Gets a list of Settingss
export function index(req, res) {
  Settings.findAsync()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Settings from the DB
export function show(req, res) {
  Settings.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Settings in the DB
export function create(req, res) {
  Settings.findAsync()
    .then(settings => {
      for (var i = 0; i < settings.length; i++) {
        Settings.findByIdAsync(settings[i]._id)
          .then(handleEntityNotFound(res))
          .then(removeEntity(res))
          .catch(handleError(res));
      }
    })
    .catch(handleError(res));
  var newSettings = new Settings();
  newSettings.poolOpens = req.body.poolOpens;
  newSettings.poolCloses = req.body.poolCloses;
  newSettings.saveAsync();
}

// Updates an existing Settings in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Settings.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Settings from the DB
export function destroy(req, res) {
  Settings.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
