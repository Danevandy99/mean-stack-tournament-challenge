'use strict';

describe('Controller: MybracketsCtrl', function () {

  // load the controller's module
  beforeEach(module('tournamentChallengeApp'));

  var MybracketsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MybracketsCtrl = $controller('MybracketsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
