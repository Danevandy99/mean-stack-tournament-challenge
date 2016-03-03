(function() {

class MasterbracketCtrl {

	constructor($http, Auth, $timeout, $scope) {
		this.$timeout = $timeout;
		this.$http = $http;
		this.awesomeThings = [];
		this.isLoggedIn = Auth.isLoggedIn;
		this.isAdmin = Auth.isAdmin;
		this.getCurrentUser = Auth.getCurrentUser;
		this.lastValue = '';
		this.blanks = ['Field of 64', 'Round of 32', 'Sweet 16', 'Elite 8', 'Final Four', 'Championship', 'Champion'];
		this.seeds = [1, 16, 8, 9, 5, 12, 4, 13, 6, 11, 3, 14, 7, 10, 2, 15];
		this.mb = [];
		this.$http.get('/api/masterbracket/').then(response => {
			this.mb = response.data;
		});
	}

	range(count) {
		var ratings = [];
		for (var i = 0; i < count; i += 2) {
			ratings.push(i);
		}
		return ratings;
	}

	changeValue(event, admin) {
		if (admin) {
			var id = event.target.id;
			document.getElementById(id).type = 'text';
			document.getElementById(id).select();
			this.lastValue = document.getElementById(id).value;
			document.getElementById(id).classList.add('focused');
		}
	}

	changeToButton(event, admin) {
		if (admin) {
			var id = event.target.id;
			document.getElementById(id).type = 'submit';
			if (document.getElementById(id).value !== this.lastValue && document.getElementById(id).value !== '') {
				var saveButton = document.getElementById('save-changes');
				saveButton.style.display = 'inline-block';
			}
			if (event.target.value == '') {
				event.target.value = this.lastValue;
			}
			document.getElementById(id).classList.remove('focused');
		}
	}

	advanceTeam(event, admin) {
		if (event.target.type !== 'text' && admin) {
			var id = event.target.id;
			var idArray = id.split('');
			var nextColumn = 0;
			var compare = 0;
			if (idArray.length === 4) {
				nextColumn = parseInt(idArray[2] + idArray[3]) / 2;
				compare = idArray[0] + idArray[1];
			} else {
				nextColumn = parseInt(idArray[1] + idArray[2]) / 2;
				compare = idArray[0];
			}
			var newId = [];
			if (compare % 2 === 0) {
				if (idArray.length === 4) {
					var index = parseInt(idArray[0] + idArray[1]) / 2;
				} else {
					var index = parseInt(idArray[0]) / 2;
				}
				newId.push(index);
			} else {
				if (idArray.length === 4) {
					var index = (parseInt((idArray[0]) + idArray[1]) - 1) / 2;
				} else {
					var index = (parseInt(idArray[0]) - 1) / 2;
				}
				newId.push(index);
			}
			newId.push(nextColumn);
			newId = newId.join('');
			if (event.target.value !== '') {
				document.getElementById(newId).value = event.target.value;
			}
			var saveButton = document.getElementById('save-changes');
			saveButton.style.display = 'inline-block';
		}
	}

	resetSpace(event, admin) {
		if (admin) {
			var id = event.target.id;
			document.getElementById(id).value = '';
			var saveButton = document.getElementById('save-changes');
			saveButton.style.display = 'inline-block';
		}
	}

	saveChanges() {
		var bracketArray = [];

		var fieldArray = [];
		for (var i = 0; i < 64; i++) {
			var id = i + '64';
			var value = document.getElementById(id).value;
			if (this.blanks.indexOf(value) >= 0) {
				fieldArray.push("");
			} else {
				fieldArray.push(value);
			}
		}
		bracketArray.push(fieldArray);

		var roundArray = [];
		for (var j = 0; j < 32; j++) {
			var id = j + '32';
			var value = document.getElementById(id).value;
			if (this.blanks.indexOf(value) >= 0) {
				roundArray.push('');
			} else {
				roundArray.push(value);
			}
		}
		bracketArray.push(roundArray);

		var sweetArray = [];
		for (var k = 0; k < 16; k++) {
			var id = k + '16';
			var value = document.getElementById(id).value;
			if (this.blanks.indexOf(value) >= 0) {
				sweetArray.push('');
			} else {
				sweetArray.push(value);
			}
		}
		bracketArray.push(sweetArray);

		var eliteArray = [];
		for (var l = 0; l < 8; l++) {
			var id = l + '8';
			var value = document.getElementById(id).value;
			if (this.blanks.indexOf(value) >= 0) {
				eliteArray.push('');
			} else {
				eliteArray.push(value);
			}
		}
		bracketArray.push(eliteArray);

		var finalArray = [];
		for (var m = 0; m < 4; m++) {
			var id = m + '4';
			var value = document.getElementById(id).value;
			if (this.blanks.indexOf(value) >= 0) {
				finalArray.push('');
			} else {
				finalArray.push(value);
			}
		}
		bracketArray.push(finalArray);

		var championshipArray = [];
		for (var n = 0; n < 2; n++) {
			var id = n + '2';
			var value = document.getElementById(id).value;
			if (this.blanks.indexOf(value) >= 0) {
				championshipArray.push('');
			} else {
				championshipArray.push(value);
			}
		}
		bracketArray.push(championshipArray);

		var championArray = [];
		var id = '01';
		var value = document.getElementById(id).value;
		if (this.blanks.indexOf(value) >= 0) {
			championArray.push('');
		} else {
			championArray.push(value);
		}
		bracketArray.push(championArray);

		this.$http.post('/api/masterbracket', bracketArray).success(function(data, status) {
			var saveButton = document.getElementById('save-changes');
			saveButton.style.display = 'none';

		});
	}
}



angular.module('tournamentChallengeApp')
.controller('MasterbracketCtrl', MasterbracketCtrl)
.directive('sglclick', ['$parse', function($parse) {
	return {
		restrict: 'A',
		link: function(scope, element, attr) {
			var fn = $parse(attr['sglclick']);
			var delay = 300, clicks = 0, timer = null;
			element.on('click', function (event) {
				clicks++; 
				if(clicks === 1) {
					timer = setTimeout(function() {
						scope.$apply(function () {
							fn(scope, { $event: event });
						}); 
						clicks = 0;             
					}, delay);
				} else {
					clearTimeout(timer);    
					clicks = 0;             
				}
			});
		}
	};
}]);
})();
