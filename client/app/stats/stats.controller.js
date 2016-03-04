'use strict';

(function() {

class StatsController {
  constructor(User, $http) {
    // Use the User $resource to fetch all users

    var mode = function mode(arr) {
    	return arr.reduce(function(current, item) {
    		var val = current.numMapping[item] = (current.numMapping[item] || 0) + 1;
    		if (val > current.greatestFreq) {
    			current.greatestFreq = val;
    			current.mode = item;
    		}
    		return current;
    	}, {mode: null, greatestFreq: -Infinity, numMapping: {}}, arr).mode;
    };

    var count = function(array, search) {
    	return array.reduce(function(n, val) {
    		return n + (val === search);
    	}, 0);
    }

    var distinct = function(array) {
    	var derivedArray = [];
    	for (var i = 0; i < array.length; i += 1) {
    		if (derivedArray.indexOf(array[i]) < 0) {
    			derivedArray.push(array[i])
    		}
    	}
    	return derivedArray;
    };

    this.champions = [];
    this.championshipTeams = [];
    this.finalFourTeams = [];
    this.EliteEightTeams = [];
    this.SweetSixteenTeams = [];
    this.Roundof32 = [];

    this.users = User.query();
    this.$http = $http;
  	this.$http.get('/api/brackets/').then(response => {
			this.brackets = response.data;
			var champions = [];
			for (var i = 0; i < this.brackets.length; i++) {
				champions.push(this.brackets[i].bracket[6].toString());
			}

			for (var j = 0; j < distinct(champions).length; j++) {
				var object = {};
				object.count = count(champions, distinct(champions)[j]);
				object.percentage = Math.round((count(champions, distinct(champions)[j]) / champions.length) * 100);
				object.name = distinct(champions)[j];
				this.champions.push(object);
			}

			this.champions.sort(function(a, b) {
				if (a.percentage > b.percentage) {
					return -1;
				}
				if (a.percentage < b.percentage) {
					return 1;
				}
  			// a must be equal to b
  			return 0;
			});

			this.champions = this.champions.splice(0, 5);

			var championshipTeams = [];
			for (var k = 0; k < this.brackets.length; k++) {
				championshipTeams = this.brackets[k].bracket[5].concat(championshipTeams);
			}

			for (var l = 0; l < distinct(championshipTeams).length; l++) {
				var object = {};
				object.count = count(championshipTeams, distinct(championshipTeams)[l]);
				object.percentage = Math.round((count(championshipTeams, distinct(championshipTeams)[l]) / championshipTeams.length) * 100);
				object.name = distinct(championshipTeams)[l];
				this.championshipTeams.push(object);
			}

			this.championshipTeams.sort(function(a, b) {
				if (a.percentage > b.percentage) {
					return -1;
				}
				if (a.percentage < b.percentage) {
					return 1;
				}
  			// a must be equal to b
  			return 0;
			});

			this.championshipTeams = this.championshipTeams.splice(0, 5);

			var finalFourTeams = [];
			for (var m = 0; m < this.brackets.length; m++) {
				finalFourTeams = this.brackets[m].bracket[4].concat(finalFourTeams);
			}

			for (var n = 0; n < distinct(finalFourTeams).length; n++) {
				var object = {};
				object.count = count(finalFourTeams, distinct(finalFourTeams)[n]);
				object.percentage = Math.round((count(finalFourTeams, distinct(finalFourTeams)[n]) / finalFourTeams.length) * 100);
				object.name = distinct(finalFourTeams)[n];
				this.finalFourTeams.push(object);
			}

			this.finalFourTeams.sort(function(a, b) {
				if (a.percentage > b.percentage) {
					return -1;
				}
				if (a.percentage < b.percentage) {
					return 1;
				}
  			// a must be equal to b
  			return 0;
			});

			this.finalFourTeams = this.finalFourTeams.splice(0, 5);

			var EliteEightTeams = [];
			for (var o = 0; o < this.brackets.length; o++) {
				EliteEightTeams = this.brackets[o].bracket[3].concat(EliteEightTeams);
			}

			for (var p = 0; p < distinct(EliteEightTeams).length; p++) {
				var object = {};
				object.count = count(EliteEightTeams, distinct(EliteEightTeams)[p]);
				object.percentage = Math.round((count(EliteEightTeams, distinct(EliteEightTeams)[p]) / EliteEightTeams.length) * 100);
				object.name = distinct(EliteEightTeams)[p];
				this.EliteEightTeams.push(object);
			}

			this.EliteEightTeams.sort(function(a, b) {
				if (a.percentage > b.percentage) {
					return -1;
				}
				if (a.percentage < b.percentage) {
					return 1;
				}
  			// a must be equal to b
  			return 0;
			});

			this.EliteEightTeams = this.EliteEightTeams.splice(0, 5);

			var SweetSixteenTeams = [];
			for (var q = 0; q < this.brackets.length; q++) {
				SweetSixteenTeams = this.brackets[q].bracket[2].concat(SweetSixteenTeams);
			}

			for (var r = 0; r < distinct(SweetSixteenTeams).length; r++) {
				var object = {};
				object.count = count(SweetSixteenTeams, distinct(SweetSixteenTeams)[r]);
				object.percentage = Math.round((count(SweetSixteenTeams, distinct(SweetSixteenTeams)[r]) / SweetSixteenTeams.length) * 100);
				object.name = distinct(SweetSixteenTeams)[r];
				this.SweetSixteenTeams.push(object);
			}

			this.SweetSixteenTeams.sort(function(a, b) {
				if (a.percentage > b.percentage) {
					return -1;
				}
				if (a.percentage < b.percentage) {
					return 1;
				}
  			// a must be equal to b
  			return 0;
			});

			this.SweetSixteenTeams = this.SweetSixteenTeams.splice(0, 5);

			var Roundof32 = [];
			for (var s = 0; s < this.brackets.length; s++) {
				Roundof32 = this.brackets[s].bracket[1].concat(Roundof32);
			}

			for (var t = 0; t < distinct(Roundof32).length; t++) {
				var object = {};
				object.count = count(Roundof32, distinct(Roundof32)[t]);
				object.percentage = Math.round((count(Roundof32, distinct(Roundof32)[t]) / Roundof32.length) * 100);
				object.name = distinct(Roundof32)[t];
				this.Roundof32.push(object);
			}

			this.Roundof32.sort(function(a, b) {
				if (a.percentage > b.percentage) {
					return -1;
				}
				if (a.percentage < b.percentage) {
					return 1;
				}
  			// a must be equal to b
  			return 0;
			});

			this.Roundof32 = this.Roundof32.splice(0, 5);
		});
  }

  
}

angular.module('tournamentChallengeApp.admin')
  .controller('StatsCtrl', StatsController);

})();
