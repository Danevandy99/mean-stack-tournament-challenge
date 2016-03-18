'use strict';

angular.module('tournamentChallengeApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/printbracket', {
        templateUrl: 'app/printbracket/printbracket.html',
        controller: 'PrintbracketCtrl',
        controllerAs: 'printbracket'
      });
  });
