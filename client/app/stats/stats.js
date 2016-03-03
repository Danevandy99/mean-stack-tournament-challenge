'use strict';

angular.module('tournamentChallengeApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/stats', {
        templateUrl: 'app/stats/stats.html',
        controller: 'StatsCtrl',
        controllerAs: 'stats'
      });
  });
