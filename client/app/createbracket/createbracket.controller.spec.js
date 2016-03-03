'use strict';

describe('Controller: CreatebracketCtrl', function () {

  // load the controller's module
  beforeEach(module('tournamentChallengeApp'));

  var CreatebracketCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CreatebracketCtrl = $controller('CreatebracketCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
