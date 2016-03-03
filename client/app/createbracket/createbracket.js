'use strict';

angular.module('tournamentChallengeApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/createbracket', {
        templateUrl: 'app/createbracket/createbracket.html',
        controller: 'CreatebracketCtrl',
        controllerAs: 'createbracket'
      });
  });
