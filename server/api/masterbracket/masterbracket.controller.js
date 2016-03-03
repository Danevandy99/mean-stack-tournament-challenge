/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/masterbracket              ->  index
 * POST    /api/masterbracket              ->  create
 * GET     /api/masterbracket/:id          ->  show
 * PUT     /api/masterbracket/:id          ->  update
 * DELETE  /api/masterbracket/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Masterbracket from './masterbracket.model';
import User from '../user/user.model';
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

export function update(req, res) {
  Masterbracket.findAsync()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a list of Masterbrackets
export function index(req, res) {
  var url = require('url');
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;
  Masterbracket.findAsync()
    .then(bracket => {
      if (query.round == null) {
        res.json(bracket[0].bracket);
      } else  {
        res.json(bracket[0].bracket[query.round]);
      }
    })
    .catch(handleError(res));
}

// Gets a single Masterbracket from the DB
export function show(req, res) {
  Masterbracket.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Masterbracket in the DB
export function create(req, res) {
  Masterbracket.findAsync()
    .then(brackets => {
      for (var i = 0; i < brackets.length; i++) {
        Masterbracket.findByIdAsync(brackets[i]._id)
          .then(handleEntityNotFound(res))
          .then(removeEntity(res))
          .catch(handleError(res));
      }
    })
    .catch(handleError(res));
  var createBracket = new Masterbracket();
  createBracket.bracket = req.body;
  createBracket.save();
  User.findAsync()
  .then(users => {
    Bracket.findAsync()
      .then(rankings => {
        for (var i = 0; i < rankings.length; i++) {
          Bracket.findByIdAsync(rankings[i]._id)
            .then(handleEntityNotFound(res))
            .then(removeEntity(res))
            .catch(handleError(res));
        }
      });
    for (var a = 0; a < users.length; a++) {
      var user = users[a];
      for (var b = 0; b < user.brackets.length; b++) {
        var bracket = user.brackets[b];
        var score = 0;
        var picksMissed = 0;
        var picksMade = 0;
        var isInArray = function(value, array) {
          return array.indexOf(value);
        }   
        var teamsSubtracted = [];
        bracket.potentialPoints = 192;
        for (var c = 0; c < 32; c++) {
          if (createBracket.bracket[1][c] == '') {
            score += 0;
          } else if (createBracket.bracket[1][c] === bracket.bracket[1][c]) {
            score += 1;
            picksMade += 1;
          } else {
            score += 0;
            picksMissed += 1;
            bracket.potentialPoints -= 1;
            for (var i = 2; i < 7; i++) {
              var index = isInArray(bracket.bracket[1][c], bracket.bracket[i]);
              if (index > -1 && createBracket.bracket[i][index] == '' && isInArray(bracket.bracket[1][c], teamsSubtracted) === -1) {
                switch (i) {
                  case 2:
                    bracket.potentialPoints -= 2;
                    break;
                  case 3:
                    bracket.potentialPoints -= 4;
                    break;
                  case 4:
                    bracket.potentialPoints -= 8;
                    break;
                  case 5:
                    bracket.potentialPoints -= 16;
                    break;
                  case 6:
                    bracket.potentialPoints -= 32;
                    break;
                }
                
              }
            }
            teamsSubtracted.push(bracket.bracket[1][c]);
          }
        }

        for (var d = 0; d < 16; d++) {
          if (createBracket.bracket[2][d] == '') {
            score += 0;
          } else if (createBracket.bracket[2][d] === bracket.bracket[2][d]) {
            score += 2;
            picksMade += 1;
          } else {
            score += 0;
            picksMissed += 1;
            bracket.potentialPoints -= 2;
            for (var i = 3; i < 7; i++) {
              var index = isInArray(bracket.bracket[2][d], bracket.bracket[i]);
              if (index > -1 && createBracket.bracket[i][index] == '' && isInArray(bracket.bracket[2][d], teamsSubtracted) === -1) {
                switch (i) {
                  case 2:
                    bracket.potentialPoints -= 2;
                    break;
                  case 3:
                    bracket.potentialPoints -= 4;
                    break;
                  case 4:
                    bracket.potentialPoints -= 8;
                    break;
                  case 5:
                    bracket.potentialPoints -= 16;
                    break;
                  case 6:
                    bracket.potentialPoints -= 32;
                    break;
                }
                
              }
            }
            teamsSubtracted.push(bracket.bracket[2][d]);
          }
        }

        for (var e = 0; e < 8; e++) {
          if (createBracket.bracket[3][e] == '') {
            score += 0;
          } else if (createBracket.bracket[3][e] === bracket.bracket[3][e]) {
            score += 4;
            picksMade += 1;
          } else {
            score += 0;
            picksMissed += 1;
            bracket.potentialPoints -= 4;
            for (var i = 4; i < 7; i++) {
              var index = isInArray(bracket.bracket[3][e], bracket.bracket[i]);
              if (index > -1 && createBracket.bracket[i][index] == '' && isInArray(bracket.bracket[3][e], teamsSubtracted) === -1) {
                switch (i) {
                  case 2:
                    bracket.potentialPoints -= 2;
                    break;
                  case 3:
                    bracket.potentialPoints -= 4;
                    break;
                  case 4:
                    bracket.potentialPoints -= 8;
                    break;
                  case 5:
                    bracket.potentialPoints -= 16;
                    break;
                  case 6:
                    bracket.potentialPoints -= 32;
                    break;
                }
                
              }
            }
            teamsSubtracted.push(bracket.bracket[3][e]);
          }
        }

        for (var f = 0; f < 4; f++) {
          if (createBracket.bracket[4][f] == '') {
            score += 0;
          } else if (createBracket.bracket[4][f] === bracket.bracket[4][f]) {
            score += 8;
            picksMade += 1;
          } else {
            score += 0;
            picksMissed += 1;
            bracket.potentialPoints -= 8;
            for (var i = 5; i < 7; i++) {
              var index = isInArray(bracket.bracket[4][f], bracket.bracket[i]);
              if (index > -1 && createBracket.bracket[i][index] == '' && isInArray(bracket.bracket[4][f], teamsSubtracted) === -1) {
                switch (i) {
                  case 2:
                    bracket.potentialPoints -= 2;
                    break;
                  case 3:
                    bracket.potentialPoints -= 4;
                    break;
                  case 4:
                    bracket.potentialPoints -= 8;
                    break;
                  case 5:
                    bracket.potentialPoints -= 16;
                    break;
                  case 6:
                    bracket.potentialPoints -= 32;
                    break;
                }
                
              }
            }
            teamsSubtracted.push(bracket.bracket[4][f]);
          }
        }

        for (var g = 0; g < 2; g++) {
          if (createBracket.bracket[5][g] == '') {
            score += 0;
          } else if (createBracket.bracket[5][g] === bracket.bracket[5][g]) {
            score += 16;
            picksMade += 1;
          } else {
            score += 0;
            picksMissed += 1;
            bracket.potentialPoints -= 16;
            for (var i = 6; i < 7; i++) {
              var index = isInArray(bracket.bracket[5][g], bracket.bracket[i]);
              if (index > -1 && createBracket.bracket[i][index] == '' && isInArray(bracket.bracket[5][g], teamsSubtracted) === -1) {
                switch (i) {
                  case 2:
                    bracket.potentialPoints -= 2;
                    break;
                  case 3:
                    bracket.potentialPoints -= 4;
                    break;
                  case 4:
                    bracket.potentialPoints -= 8;
                    break;
                  case 5:
                    bracket.potentialPoints -= 16;
                    break;
                  case 6:
                    bracket.potentialPoints -= 32;
                    break;
                }
              }
            }
            teamsSubtracted.push(bracket.bracket[5][g]);
          }
        }

        for (var h = 0; h < 1; h++) {
          if (createBracket.bracket[6][h] == '') {
            score += 0;
          } else if (createBracket.bracket[6][h] === bracket.bracket[6][h]) {
            score += 32;
            picksMade += 1;
          } else {
            score += 0;
            picksMissed += 1;
            bracket.potentialPoints -= 32;
          }
        }

        bracket.score = score;
        bracket.pickPercentage = Math.round((picksMade / (picksMade + picksMissed)) * 100);
        var number = a;
        users[number].brackets.splice(b, 1, bracket);
        users[number].saveAsync();
        var newRankings = new Bracket();
        newRankings.name = bracket.name;
        newRankings.score = bracket.score;
        newRankings.potentialPoints = bracket.potentialPoints;
        newRankings.pickPercentage = bracket.pickPercentage;
        newRankings.pickedChampion = bracket.pickedChampion;
        newRankings.tieBreaker = bracket.tieBreaker;
        newRankings.owner = bracket.owner; 
        newRankings.bracket = bracket.bracket;
        newRankings.rank = 0;
        newRankings.mover_loser = 0;
        newRankings.saveAsync();
      }
    }

  })
  .catch(handleError(err));
}

// Updates an existing Masterbracket in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Masterbracket.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Masterbracket from the DB
export function destroy(req, res) {
  Masterbracket.findByIdAsync(req.body.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
