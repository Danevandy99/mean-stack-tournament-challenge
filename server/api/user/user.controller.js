'use strict';

import User from './user.model';
import passport from 'passport';
import config from '../../config/environment';
import jwt from 'jsonwebtoken';
import Masterbracket from '../masterbracket/masterbracket.model';
var ProgressBar = require('progress');

function validationError(res, statusCode) {
  statusCode = statusCode || 422;
  return function(err) {
    res.status(statusCode).json(err);
  }
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

export function deleteBracket(req, res, next) {
  var userId = req.user._id;

  User.findOneAsync({ _id: userId }, '-salt -password')
    .then(user => { // don't ever give out the password or salt
      if (!user) {
        return res.status(401).end();
      }
      user.brackets.splice(req.body.index, 1);
      user.save();
      res.json(user.brackets);
    })
    .catch(err => next(err));
}

/*export function generate(req, res, next) {
  Masterbracket.findAsync()
    .then(brackets => {
      var masterBracketData = brackets[0].bracket;
      var found = false;
      var counter = 0;
      var highest = 0;
      var average = 0;
      var lowest = null;
      var getRandom = function(min, max) {
        return Math.random() * (max - min) + min;
      }
      var checkSeeding = function(one, two, valuesArray) {
        for (var i = 0; i < valuesArray.length; i++) {
          if (parseInt(one.substring(0,2)) == valuesArray[i]) {
            break;
            return two;
          } else if (parseInt(two.substring(0,2)) == valuesArray[i]) {
            break;
            return one;
          }
        }

        var random = Math.random();
        var random2 = Math.random();
        if (random > random2) {
          return one;
        } else {
          return two;
        }
      }
      var bar = new ProgressBar(' Generating :bar :percent :elapseds', { total: 300000});
      while (found === false && counter < 300000) {
        counter += 1;
        var newBracket = [[],[],[],[],[],[],[]];
        newBracket[0] = masterBracketData[0];

        for (var i = 0; i < newBracket[0].length; i += 2) {
          if (newBracket[0][i][0] == 1) {
            newBracket[1].push(newBracket[0][i]);
          } else {
            var random = Math.random() / parseInt(newBracket[0][i].substring(0,2));
            var random2 = Math.random() / parseInt(newBracket[0][i + 1].substring(0,2));
            if (random > random2) {
              newBracket[1].push(newBracket[0][i]);
            } else {
              newBracket[1].push(newBracket[0][i + 1]);
            }
          }
        }

        for (var i = 0; i < newBracket[1].length; i += 2) {
          if (parseInt(newBracket[1][i].substring(0,2)) >= 13) {
            newBracket[2].push(newBracket[1][i + 1]);
          } else if (parseInt(newBracket[1][i + 1].substring(0,2)) >= 13) {
            newBracket[2].push(newBracket[1][i]);
          } else if (parseInt(newBracket[1][i].substring(0,2)) == 9) {
            newBracket[2].push(newBracket[1][i + 1]);
          } else if (parseInt(newBracket[1][i + 1].substring(0,2)) == 9) {
            newBracket[2].push(newBracket[1][i]);
          } else {
            var random = Math.random() / parseInt(newBracket[1][i].substring(0,2));
            var random2 = Math.random() / parseInt(newBracket[1][i + 1].substring(0,2));
            if (random > random2) {
              newBracket[2].push(newBracket[1][i]);
            } else {
              newBracket[2].push(newBracket[1][i + 1]);
            }
          }
        }

        for (var i = 0; i < newBracket[2].length; i += 2) {
          if (newBracket[2][i].substring(0,2) == '12' || newBracket[2][i].substring(0,2) == '10' || newBracket[2][i].substring(0,1) == '9') {
            newBracket[3].push(newBracket[2][i + 1]);
          } else if (newBracket[2][i + 1].substring(0,2) == '12' || newBracket[2][i + 1].substring(0,2) == '10' || newBracket[2][i + 1].substring(0,1) == '9') {
            newBracket[3].push(newBracket[2][i]);
          } else {
            var random = Math.random() / parseInt(newBracket[2][i].substring(0,2));
            var random2 = Math.random() / parseInt(newBracket[2][i + 1].substring(0,2));
            if (random > random2) {
              newBracket[3].push(newBracket[2][i]);
            } else {
              newBracket[3].push(newBracket[2][i + 1]);
            }
          }
        }

        for (var i = 0; i < newBracket[3].length; i += 2) {
          if (parseInt(newBracket[3][i].substring(0,2)) > 6) {
            newBracket[4].push(newBracket[3][i + 1]);
          } else if (parseInt(newBracket[3][i + 1].substring(0,2)) > 6) {
            newBracket[4].push(newBracket[3][i]);
          } else {
            var random = Math.random() / parseInt(newBracket[3][i].substring(0,2));
            var random2 = Math.random() / parseInt(newBracket[3][i + 1].substring(0,2));
            if (random > random2) {
              newBracket[4].push(newBracket[3][i]);
            } else {
              newBracket[4].push(newBracket[3][i + 1]);
            }
          }
        }

        for (var i = 0; i < newBracket[4].length; i += 2) {
          if (parseInt(newBracket[4][i].substring(0,1)) == 8 || parseInt(newBracket[4][i].substring(0,1)) == 7 || parseInt(newBracket[4][i].substring(0,1)) == 4) {
            newBracket[5].push(newBracket[4][i + 1]);
          } else if (parseInt(newBracket[4][i + 1].substring(0,1)) == 8 || parseInt(newBracket[4][i + 1].substring(0,1)) == 7 || parseInt(newBracket[4][i + 1].substring(0,1)) == 4) {
            newBracket[5].push(newBracket[4][i]);
          } else {
            var random = Math.random() / parseInt(newBracket[4][i].substring(0,2));
            var random2 = Math.random() / parseInt(newBracket[4][i + 1].substring(0,2));
            if (random > random2) {
              newBracket[5].push(newBracket[4][i]);
            } else {
              newBracket[5].push(newBracket[4][i + 1]);
            }
          }
        }

        for (var i = 0; i < newBracket[5].length; i += 2) {
          if (parseInt(newBracket[5][i].substring(0,1)) > 4) {
            newBracket[6].push(newBracket[5][i + 1]);
          } else if (parseInt(newBracket[5][i + 1].substring(0,1)) > 4) {
            newBracket[6].push(newBracket[5][i]);
          } else {
            var random = Math.random() / parseInt(newBracket[5][i].substring(0,2));
            var random2 = Math.random() / parseInt(newBracket[5][i + 1].substring(0,2));
            if (random > random2) {
              newBracket[6].push(newBracket[5][i]);
            } else {
              newBracket[6].push(newBracket[5][i + 1]);
            }
          }
        }
        

        var entryObject = {};
        entryObject.name = Math.random().toString(36).substring(7);
        entryObject.score = 0;
        entryObject.potentialPoints = 192;
        entryObject.pickPercentage = 100;
        entryObject.pickedChampion = newBracket[6];
        entryObject.tieBreaker = 144;
        entryObject.owner = req.user.email;
        entryObject.bracket = newBracket;
        entryObject.bracket_active = true;

        var createBracket = brackets[0];
        var bracket = entryObject;
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

        if (bracket.potentialPoints > 180) {
          req.user.brackets.push(bracket);
          found = true;
        } 

        if (bracket.potentialPoints > highest) {
          highest = bracket.potentialPoints;
        }

        if (lowest == null) {
          lowest = bracket.potentialPoints;
        } else if (bracket.potentialPoints < lowest && lowest != null) {
          lowest = bracket.potentialPoints;
        }

        if (average > 0) {
          average = (average + bracket.potentialPoints) / 2;
        } else {
          average = bracket.potentialPoints;
        }
        bar.tick();
      }
      req.user.saveAsync();
      console.log('Found: ' + found);
      console.log('Highest: ' + highest);
      console.log('Average: ' + average);
      console.log('Lowest: ' + lowest);
      console.log(counter);
      res.json('Success');
    })
    .catch(err => next(err));
}*/

export function addBracket(req, res, next) {
  var userId = req.user._id;
  User.findOneAsync({ _id: userId }, '-salt -password')
    .then(user => { // don't ever give out the password or salt
      if (!user) {
        return res.status(401).end();
      }
      user.brackets.push(req.body);
      user.save();
      res.status(200).json('Success');
    })
    .catch(err => next(err));
}

export function updateBracket(req, res, next) {
  var email = req.body.email;
  var bracket = req.body.bracket;
  User.findOneAsync({email: email })
    .then(user => {
      if (!user) {
        return res.status(401).end();
      }
      var index = req.body.index;
      user.brackets.splice(index, 1, bracket);
      user.save();
      res.status(200).json('Success');
    })
    .catch(err => next(err));
}

/**
 * Get list of users
 * restriction: 'admin'
 */
export function index(req, res) {
  User.findAsync({}, '-salt -password')
    .then(users => {
      res.status(200).json(users);
    })
    .catch(handleError(res));
}

/**
 * Creates a new user
 */
export function create(req, res, next) {
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.role = 'user';
  newUser.saveAsync()
    .spread(function(user) {
      var token = jwt.sign({ _id: user._id }, config.secrets.session, {
        expiresIn: 60 * 60 * 5
      });
      res.json({ token });
    })
    .catch(validationError(res));
}

/**
 * Get a single user
 */
export function show(req, res, next) {
  var userId = req.params.id;

  User.findByIdAsync(userId)
    .then(user => {
      if (!user) {
        return res.status(404).end();
      }
      res.json(user.profile);
    })
    .catch(err => next(err));
}

/**
 * Deletes a user
 * restriction: 'admin'
 */
export function destroy(req, res) {
  User.findByIdAndRemoveAsync(req.params.id)
    .then(function() {
      res.status(204).end();
    })
    .catch(handleError(res));
}

/**
 * Change a users password
 */
export function changePassword(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findByIdAsync(userId)
    .then(user => {
      if (user.authenticate(oldPass)) {
        user.password = newPass;
        return user.saveAsync()
          .then(() => {
            res.status(204).end();
          })
          .catch(validationError(res));
      } else {
        return res.status(403).end();
      }
    });
}

/**
 * Get my info
 */
export function me(req, res, next) {
  var userId = req.user._id;

  User.findOneAsync({ _id: userId }, '-salt -password')
    .then(user => { // don't ever give out the password or salt
      if (!user) {
        return res.status(401).end();
      }
      res.json(user);
    })
    .catch(err => next(err));
}

/**
 * Authentication callback
 */
export function authCallback(req, res, next) {
  res.redirect('/');
}
