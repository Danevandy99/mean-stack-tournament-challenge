'use strict';

angular.module('tournamentChallengeApp.auth', [
  'tournamentChallengeApp.constants',
  'tournamentChallengeApp.util',
  'ngCookies',
  'ngRoute'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
