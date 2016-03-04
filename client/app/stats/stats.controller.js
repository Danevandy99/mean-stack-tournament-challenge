'use strict';

(function() {

class StatsController {
  constructor(User, $http) {
    // Use the User $resource to fetch all users

    var unique = function(origArr) {
    	var newArr = [],
    	origLen = origArr.length,
    	found, x, y;

    	for (x = 0; x < origLen; x++) {
    		found = undefined;
    		for (y = 0; y < newArr.length; y++) {
    			if (origArr[x] === newArr[y]) {
    				found = true;
    				break;
    			}
    		}
    		if (!found) {
    			newArr.push(origArr[x]);
    		}
    	}
    	return newArr;
    }

    this.users = User.query();
    this.$http = $http;
  	this.$http.get('/api/brackets/').then(response => {
			this.brackets = response.data;
			this.champions = [];
			for (var i = 0; i < this.brackets.length; i++) {
				this.champions.push(this.brackets[i].bracket[6].toString().substring(2));
			}
			this.champions = unique(this.champions);
			console.log(this.champions);
		});
  }

  
}

angular.module('tournamentChallengeApp.admin')
  .controller('StatsCtrl', StatsController);

})();
