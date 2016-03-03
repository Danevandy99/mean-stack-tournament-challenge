'use strict';

describe('Controller: MasterbracketCtrl', function () {

  // load the controller's module
  beforeEach(module('tournamentChallengeApp'));

  var MasterbracketCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MasterbracketCtrl = $controller('MasterbracketCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
