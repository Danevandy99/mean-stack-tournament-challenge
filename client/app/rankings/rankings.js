'use strict';

angular.module('tournamentChallengeApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/rankings', {
        templateUrl: 'app/rankings/rankings.html',
        controller: 'RankingsCtrl',
        controllerAs: 'rankings'
      });
  });
