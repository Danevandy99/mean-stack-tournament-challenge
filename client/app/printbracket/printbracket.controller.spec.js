'use strict';

describe('Controller: PrintbracketCtrl', function () {

  // load the controller's module
  beforeEach(module('tournamentChallengeApp'));

  var PrintbracketCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PrintbracketCtrl = $controller('PrintbracketCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
