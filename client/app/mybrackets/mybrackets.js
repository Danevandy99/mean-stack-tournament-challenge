'use strict';

angular.module('tournamentChallengeApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/mybrackets', {
        templateUrl: 'app/mybrackets/mybrackets.html',
        controller: 'MybracketsCtrl',
        controllerAs: 'mybrackets'
      });
  });
