'use strict';

(function() {

class StatsController {
  constructor(User, $http) {
    // Use the User $resource to fetch all users
    this.users = User.query();
    this.$http = $http;
  	this.$http.get('/api/brackets/').then(response => {
		this.brackets = response.data;
	});
  }

  
}

angular.module('tournamentChallengeApp.admin')
  .controller('StatsCtrl', StatsController);

})();
