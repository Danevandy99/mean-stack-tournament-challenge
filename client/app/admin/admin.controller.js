'use strict';

(function() {

class AdminController {
  constructor(User, $http) {
    // Use the User $resource to fetch all users
    this.users = User.query();
    this.$http = $http;
  	this.$http.get('/api/settings/').then(response => {
			this.poolOpens = response.data[0].poolOpens;
			this.poolCloses = response.data[0].poolCloses;
		});

    this.brackets = [];
    this.masterbracket = [];
    this.round1 = [];
    this.round2 = [];
    this.round3 = [];
    this.round4 = [];
    this.round5 = [];
    this.round6 = [];

    this.textarea = '';
  }

  delete(user) {
    if (confirm('Are you sure you want to delete this user?')) {
      user.$remove();
      this.users.splice(this.users.indexOf(user), 1);
    }
  }

  saveArticle() {
    console.log(tinyMCE.get('mytextarea').getContent());
  }

  activateBracket(user, bracket, index) {
    var object= {};
    object.email = user.email;
    object.index = index;
    this.users[this.users.indexOf(user)].brackets[this.users[this.users.indexOf(user)].brackets.indexOf(bracket)].bracket_active = true;
    object.bracket = this.users[this.users.indexOf(user)].brackets[this.users[this.users.indexOf(user)].brackets.indexOf(bracket)];
    this.$http.post('/api/users/updatebracket', object);
  }

  deactivateBracket(user, bracket, index) {
    var object= {};
    object.email = user.email;
    object.index = index;
    this.users[this.users.indexOf(user)].brackets[this.users[this.users.indexOf(user)].brackets.indexOf(bracket)].bracket_active = false;
    object.bracket = this.users[this.users.indexOf(user)].brackets[this.users[this.users.indexOf(user)].brackets.indexOf(bracket)];
    this.$http.post('/api/users/updatebracket', object);
  }

  setSearch() {
    this.$http.get('/api/rankings/getrankings').then(response1 => {
      if (this.brackets.length === 0) {
        this.brackets = response1.data;
        this.$http.get('/api/masterbracket?round=1').then(response2 => {
          this.round1 = response2.data.toString().split(',');
          this.$http.get('/api/masterbracket?round=2').then(response3 => {
            this.round2 = response3.data.toString().split(',');
            this.$http.get('/api/masterbracket?round=3').then(response4 => {
              this.round3 = response4.data.toString().split(',');
              this.$http.get('/api/masterbracket?round=4').then(response5 => {
                this.round4 = response5.data.toString().split(',');
                this.$http.get('/api/masterbracket?round=5').then(response6 => {
                  this.round5 = response6.data.toString().split(',');
                  this.$http.get('/api/masterbracket?round=6').then(response7 => {
                    this.round6 = response7.data.toString().split(',');
                    for (var a = 0; a < this.brackets.length; a++) {

                      var eliminatedTeams = [];
                      var i = 0;

                      this.brackets[a].round1 = this.brackets[a].bracket[1];
                      this.brackets[a].round2 = this.brackets[a].bracket[2];
                      this.brackets[a].round3 = this.brackets[a].bracket[3];
                      this.brackets[a].round4 = this.brackets[a].bracket[4];
                      this.brackets[a].round5 = this.brackets[a].bracket[5];
                      this.brackets[a].round6 = this.brackets[a].bracket[6];

                      for ( i = 0; i < 32; i++) {
                        var id = this.brackets[a].owner + this.brackets[a].name + i + '32';
                        var value = document.getElementById(id).value;
                        if (this.round1[i] == '' && eliminatedTeams.indexOf(value) < 0) {
                          document.getElementById(id).style.backgroundColor = '#3498db';
                        } else if (this.round1[i] === value) {
                          document.getElementById(id).style.backgroundColor = '#2ecc71';
                          document.getElementById(id).style.borderColor = '#27ae60';
                        } else {
                          document.getElementById(id).style.backgroundColor = '#e74c3c';
                          document.getElementById(id).style.borderColor = '#c0392b';
                        }

                        if (this.round1[i] !== '' && this.round1[i] !== value && eliminatedTeams.indexOf(value) < 0) {
                          eliminatedTeams.push(value);
                        }
                      }

                      for ( i = 0; i < 16; i++) {
                        var id = this.brackets[a].owner + this.brackets[a].name + i + '16';
                        var value = document.getElementById(id).value;
                        if (this.round2[i] == '' && eliminatedTeams.indexOf(value) < 0) {
                          document.getElementById(id).style.backgroundColor = '#3498db';
                        } else if (this.round2[i] === value) {
                          document.getElementById(id).style.backgroundColor = '#2ecc71';
                          document.getElementById(id).style.borderColor = '#27ae60';
                        } else {
                          document.getElementById(id).style.backgroundColor = '#e74c3c';
                          document.getElementById(id).style.borderColor = '#c0392b';
                        }

                        if (this.round2[i] !== '' && this.round2[i] !== value && eliminatedTeams.indexOf(value) < 0) {
                          eliminatedTeams.push(value);
                        }
                      }

                      for ( i = 0; i < 8; i++) {
                        var id = this.brackets[a].owner + this.brackets[a].name + i + '8';
                        var value = document.getElementById(id).value;
                        if (this.round3[i] == '' && eliminatedTeams.indexOf(value) < 0) {
                          document.getElementById(id).style.backgroundColor = '#3498db';
                        } else if (this.round3[i] === value) {
                          document.getElementById(id).style.backgroundColor = '#2ecc71';
                          document.getElementById(id).style.borderColor = '#27ae60';
                        } else {
                          document.getElementById(id).style.backgroundColor = '#e74c3c';
                          document.getElementById(id).style.borderColor = '#c0392b';
                        }

                        if (this.round3[i] !== '' && this.round3[i] !== value && eliminatedTeams.indexOf(value) < 0) {
                          eliminatedTeams.push(value);
                        }
                      }

                      for ( i = 0; i < 4; i++) {
                        var id = this.brackets[a].owner + this.brackets[a].name + i + '4';
                        var value = document.getElementById(id).value;
                        if (this.round4[i] == '' && eliminatedTeams.indexOf(value) < 0) {
                          document.getElementById(id).style.backgroundColor = '#3498db';
                        } else if (this.round4[i] === value) {
                          document.getElementById(id).style.backgroundColor = '#2ecc71';
                          document.getElementById(id).style.borderColor = '#27ae60';
                        } else {
                          document.getElementById(id).style.backgroundColor = '#e74c3c';
                          document.getElementById(id).style.borderColor = '#c0392b';
                        }

                        if (this.round4[i] !== '' && this.round4[i] !== value && eliminatedTeams.indexOf(value) < 0) {
                          eliminatedTeams.push(value);
                        }
                      }

                      for ( i = 0; i < 2; i++) {
                        var id = this.brackets[a].owner + this.brackets[a].name + i + '2';
                        var value = document.getElementById(id).value;
                        if (this.round5[i] == '' && eliminatedTeams.indexOf(value) < 0) {
                          document.getElementById(id).style.backgroundColor = '#3498db';
                        } else if (this.round5[i] === value) {
                          document.getElementById(id).style.backgroundColor = '#2ecc71';
                          document.getElementById(id).style.borderColor = '#27ae60';
                        } else {
                          document.getElementById(id).style.backgroundColor = '#e74c3c';
                          document.getElementById(id).style.borderColor = '#c0392b';
                        }

                        if (this.round5[i] !== '' && this.round5[i] !== value && eliminatedTeams.indexOf(value) < 0) {
                          eliminatedTeams.push(value);
                        }
                      }

                      for ( i = 0; i < 1; i++) {
                        var id = this.brackets[a].owner + this.brackets[a].name + i + '1';
                        var value = document.getElementById(id).value;
                        if (this.round6[i] == '' && eliminatedTeams.indexOf(value) < 0) {
                          document.getElementById(id).style.backgroundColor = '#3498db';
                        } else if (this.round6[i] === value) {
                          document.getElementById(id).style.backgroundColor = '#2ecc71';
                          document.getElementById(id).style.borderColor = '#27ae60';
                        } else {
                          document.getElementById(id).style.backgroundColor = '#e74c3c';
                          document.getElementById(id).style.borderColor = '#c0392b';
                        }

                        if (this.round6[i] !== '' && this.round6[i] !== value && eliminatedTeams.indexOf(value) < 0) {
                          eliminatedTeams.push(value);
                        }
                      }
                    }
                  });
                });
              });
            });
          });
        });
      }
    });
  }

  setWidth(score, potential, number) {
    if (number === 2) {
      if (potential - score === 0) {
        return 'display: none;';
      } else if (score === 0) {
        return 'width: ' + '100%; border-radius: 5px; margin-left: 3px;';
      } else {
        return 'min-width: 18%; max-width: 78%; width: ' + ((((score / potential) - 1) * -1) - 0.02) * 100 + '%;';
      }
    } else {
      if (potential - score === 0) {
        return 'width: ' + '96%; border-radius: 5px; background-color: #e74c3c;';
      } else if (score === 0) {
        return 'display: none;';
      } else {
        return 'min-width: 18%; max-width: 78%; width: ' + ((score / potential * 100) - 2) + '%';
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

  toggleBracket(event, index) {
    if (event.target.classList[1] == 'fa-chevron-down') {
      var id = 'bracket-panel' + index;
      document.getElementById(id).style.display = 'block';
      event.target.classList.remove('fa-chevron-down');
      event.target.classList.add('fa-chevron-up');
    } else {
      var id = 'bracket-panel' + index;
      document.getElementById(id).style.display = 'none';
      event.target.classList.remove('fa-chevron-up');
      event.target.classList.add('fa-chevron-down');
    }
  }

  searchChange() {
    for (var a = 0; a < this.brackets.length; a++) {

      var eliminatedTeams = [];
      var i = 0;

      for ( i = 0; i < 32; i++) {
        var id = this.brackets[a].owner + this.brackets[a].name + i + '32';
        if (document.getElementById(id) == null) {
          break;
        }
        var value = document.getElementById(id).value;
        if (this.round1[i] == '' && eliminatedTeams.indexOf(value) < 0) {
          document.getElementById(id).style.backgroundColor = '#3498db';
        } else if (this.round1[i] === value) {
          document.getElementById(id).style.backgroundColor = '#2ecc71';
          document.getElementById(id).style.borderColor = '#27ae60';
        } else {
          document.getElementById(id).style.backgroundColor = '#e74c3c';
          document.getElementById(id).style.borderColor = '#c0392b';
        }

        if (this.round1[i] !== '' && this.round1[i] !== value && eliminatedTeams.indexOf(value) < 0) {
          eliminatedTeams.push(value);
        }
      }

      for ( i = 0; i < 16; i++) {
        var id = this.brackets[a].owner + this.brackets[a].name + i + '16';
        if (document.getElementById(id) == null) {
          break;
        }
        var value = document.getElementById(id).value;
        if (this.round2[i] == '' && eliminatedTeams.indexOf(value) < 0) {
          document.getElementById(id).style.backgroundColor = '#3498db';
        } else if (this.round2[i] === value) {
          document.getElementById(id).style.backgroundColor = '#2ecc71';
          document.getElementById(id).style.borderColor = '#27ae60';
        } else {
          document.getElementById(id).style.backgroundColor = '#e74c3c';
          document.getElementById(id).style.borderColor = '#c0392b';
        }

        if (this.round2[i] !== '' && this.round2[i] !== value && eliminatedTeams.indexOf(value) < 0) {
          eliminatedTeams.push(value);
        }
      }

      for ( i = 0; i < 8; i++) {
        var id = this.brackets[a].owner + this.brackets[a].name + i + '8';
        if (document.getElementById(id) == null) {
          break;
        }
        var value = document.getElementById(id).value;
        if (this.round3[i] == '' && eliminatedTeams.indexOf(value) < 0) {
          document.getElementById(id).style.backgroundColor = '#3498db';
        } else if (this.round3[i] === value) {
          document.getElementById(id).style.backgroundColor = '#2ecc71';
          document.getElementById(id).style.borderColor = '#27ae60';
        } else {
          document.getElementById(id).style.backgroundColor = '#e74c3c';
          document.getElementById(id).style.borderColor = '#c0392b';
        }

        if (this.round3[i] !== '' && this.round3[i] !== value && eliminatedTeams.indexOf(value) < 0) {
          eliminatedTeams.push(value);
        }
      }

      for ( i = 0; i < 4; i++) {
        var id = this.brackets[a].owner + this.brackets[a].name + i + '4';
        if (document.getElementById(id) == null) {
          break;
        }
        var value = document.getElementById(id).value;
        if (this.round4[i] == '' && eliminatedTeams.indexOf(value) < 0) {
          document.getElementById(id).style.backgroundColor = '#3498db';
        } else if (this.round4[i] === value) {
          document.getElementById(id).style.backgroundColor = '#2ecc71';
          document.getElementById(id).style.borderColor = '#27ae60';
        } else {
          document.getElementById(id).style.backgroundColor = '#e74c3c';
          document.getElementById(id).style.borderColor = '#c0392b';
        }

        if (this.round4[i] !== '' && this.round4[i] !== value && eliminatedTeams.indexOf(value) < 0) {
          eliminatedTeams.push(value);
        }
      }

      for ( i = 0; i < 2; i++) {
        var id = this.brackets[a].owner + this.brackets[a].name + i + '2';
        if (document.getElementById(id) == null) {
          break;
        }
        var value = document.getElementById(id).value;
        if (this.round5[i] == '' && eliminatedTeams.indexOf(value) < 0) {
          document.getElementById(id).style.backgroundColor = '#3498db';
        } else if (this.round5[i] === value) {
          document.getElementById(id).style.backgroundColor = '#2ecc71';
          document.getElementById(id).style.borderColor = '#27ae60';
        } else {
          document.getElementById(id).style.backgroundColor = '#e74c3c';
          document.getElementById(id).style.borderColor = '#c0392b';
        }

        if (this.round5[i] !== '' && this.round5[i] !== value && eliminatedTeams.indexOf(value) < 0) {
          eliminatedTeams.push(value);
        }
      }

      for ( i = 0; i < 1; i++) {
        var id = this.brackets[a].owner + this.brackets[a].name + i + '1';
        if (document.getElementById(id) == null) {
          break;
        }
        var value = document.getElementById(id).value;
        if (this.round6[i] == '' && eliminatedTeams.indexOf(value) < 0) {
          document.getElementById(id).style.backgroundColor = '#3498db';
        } else if (this.round6[i] === value) {
          document.getElementById(id).style.backgroundColor = '#2ecc71';
          document.getElementById(id).style.borderColor = '#27ae60';
        } else {
          document.getElementById(id).style.backgroundColor = '#e74c3c';
          document.getElementById(id).style.borderColor = '#c0392b';
        }

        if (this.round6[i] !== '' && this.round6[i] !== value && eliminatedTeams.indexOf(value) < 0) {
          eliminatedTeams.push(value);
        }
      }
    }
  }

  activate(event) {
  	var n = document.getElementsByClassName('sidebar-link')
  	for(var i = 0; i < n.length; i++){
  		n[i].style.backgroundColor = '#3498db';
  	}
  	event.target.style.backgroundColor = '#2980b9';
  	event.target.style.color = '#fff';
  }

  saveChanges() {
  	var openDate;
  	var date;
  	if (document.getElementById('date').value == undefined || document.getElementById('date').value == '') {
  		date = this.poolOpens;
  	} else {
  		openDate = document.getElementById('date').value;
  		date = openDate;
			date = date.substr(0, date.length-2) +' '+ date.substr(-2);
  	}
		var closeDate;
		var date2;
		if (document.getElementById('date2').value == undefined || document.getElementById('date2').value == '') {
  		date2 = this.poolCloses;
  	} else {
  		closeDate = document.getElementById('date2').value;
  		date2 = closeDate;
			date2 = date2.substr(0, date2.length-2) +' '+ date2.substr(-2);
  	}
		var object = { poolOpens: new Date(date), poolCloses: new Date(date2) };
		this.$http.post('/api/settings', object).success(function(data, status) {
			alert('Successfully Saved!');				
		});
  }
}

angular.module('tournamentChallengeApp.admin')
  .controller('AdminController', AdminController);

})();
