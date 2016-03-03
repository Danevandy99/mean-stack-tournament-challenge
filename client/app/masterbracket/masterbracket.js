'use strict';

angular.module('tournamentChallengeApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/masterbracket', {
        templateUrl: 'app/masterbracket/masterbracket.html',
        controller: 'MasterbracketCtrl',
        controllerAs: 'masterbracket'
      });
  });
