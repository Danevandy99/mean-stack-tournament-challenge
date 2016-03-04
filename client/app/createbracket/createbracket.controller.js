'use strict';

(function() {

	class CreateBracketController {

		constructor($http, Auth, $location, $scope) {
			this.$scope = $scope;
			this.$location = $location;
			this.$http = $http;
			this.awesomeThings = [];
			this.isLoggedIn = Auth.isLoggedIn;
			this.isAdmin = Auth.isAdmin;
			this.getCurrentUser = Auth.getCurrentUser;
			this.mb = [];
			this.$http.get('/api/masterbracket/').then(response => {
				this.mb = response.data;
			});
			this.blanks = ['Field of 64', 'Round of 32', 'Sweet 16', 'Elite 8', 'Final Four', 'Championship', 'Champion'];

			this.$http.get('/api/settings/').then(response => {
				this.poolOpens = Date.parse(response.data[0].poolOpens);
				this.poolCloses = Date.parse(response.data[0].poolCloses);
				console.log(new Date(this.poolOpens).getTime());
				console.log(new Date(this.poolCloses).getTime());
				console.log(Math.floor(Date.now()));
				if (Math.floor(Date.now()) > new Date(this.poolOpens).getTime() && Math.floor(Date.now()) < new Date(this.poolCloses).getTime()) {
					this.isPoolOpen = true;
				} else {
					this.isPoolOpen = false;
				}
			});
		}

		checkName(user) {
			document.getElementById('help-block1').style.display = 'none';
			for (var i = 0; i < user.brackets.length; i++) {
				if (user.brackets[i].name == document.getElementById('bracket-name').value + " " + document.getElementById('bracket-name2').value) {
					document.getElementById('help-block1').style.display = 'block';
				}
			}
		}

		range(count) {
			var ratings = [];
			for (var i = 0; i < count; i += 2) {
				ratings.push(i);
			}
			return ratings;
		}

		nextDiv(id, user) {
			if (id == 2) {
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

				var bracketFilled = true;
				for (var i = 0; i < bracketArray.length; i++) {
					var array = bracketArray[i];
					for (var j = 0; j < bracketArray[i].length; j++) {
						if (bracketArray[i][j] == "") {
							bracketFilled = false;
							alert("Oops! Looks like you haven't finished your bracket yet.");
							break;
						}
					}
					if (bracketFilled === false) {
						break;
					}
				}

				var tieBreakerNotZero = false;
				if (parseInt(document.getElementById('tiebreaker-number').value) > 0) {
					tieBreakerNotZero = true;
				} else {
					alert('Please enter a tie breaker number. This is what you think the total number of points will be in the championship.');
				}

				if (bracketFilled && tieBreakerNotZero) {
					var entryObject = {};
					entryObject.name = document.getElementById('bracket-name').value + ' ' + document.getElementById('bracket-name2').value;
					entryObject.score = 0;
					entryObject.potentialPoints = 192;
					entryObject.pickPercentage = 100;
					entryObject.pickedChampion = bracketArray[6];
					entryObject.tieBreaker = document.getElementById('tiebreaker-number').value;
					entryObject.owner = user.email;
					entryObject.bracket = bracketArray;
					this.$http.post('/api/users/addbracket', entryObject).success(function(data, status) {
						
					});
				}
			} else if (id === 1) {
				var nameExists = false;
				for (var i = 0; i < user.brackets.length; i++) {
					if (user.brackets[i].name == document.getElementById('bracket-name').value + ' ' + document.getElementById('bracket-name2').value) {
						nameExists = true;
						break;
					}
				}

				if (nameExists) {
					document.getElementById('help-block1').style.display = 'block';
				} else {
					if (document.getElementById('bracket-name').value + " " + document.getElementById('bracket-name2').value != ' ' && document.getElementById('bracket-name').value + ' ' + document.getElementById('bracket-name2').value != null) {
						document.getElementById(id).style.display = 'none';
						document.getElementById(parseInt(id + 1)).style.display = 'block';
					} else {
						alert('Please enter a name for your bracket.');
					}
				}
			}
		}

		lastDiv(id) {
			document.getElementById(id).style.display = 'none';
			document.getElementById(parseInt(id - 1)).style.display = 'block';
		}

		advanceTeam(event, admin) {
			if (event.target.type !== 'text') {
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
			}
		}

		resetSpace(event, admin) {
			if (true) {
				var id = event.target.id;
				document.getElementById(id).value = '';
				var saveButton = document.getElementById('save-changes');
				saveButton.style.display = 'inline-block';
			}
		}
	}

	angular.module('tournamentChallengeApp')
	.controller('CreatebracketCtrl', CreateBracketController);

})();
