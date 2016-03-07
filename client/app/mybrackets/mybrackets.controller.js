'use strict';

(function() {

class MybracketsController {

  constructor($http, Auth) {
    this.$http = $http;
    this.awesomeThings = [];
    this.isLoggedIn = Auth.isLoggedIn;
	   this.isAdmin = Auth.isAdmin;
	   this.getCurrentUser = Auth.getCurrentUser;
     this.brackets = [];
     this.masterbracket = [];
     this.isPoolOpen = false;
     this.round1 = [];
     this.round2 = [];
     this.round3 = [];
     this.round4 = [];
     this.round5 = [];
     this.round6 = [];

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

    $http.get('/api/users/me').then(response1 => {
      this.brackets = response1.data.brackets;
      $http.get('/api/masterbracket?round=1').then(response2 => {
        this.round1 = response2.data.toString().split(',');
        $http.get('/api/masterbracket?round=2').then(response3 => {
          this.round2 = response3.data.toString().split(',');
          $http.get('/api/masterbracket?round=3').then(response4 => {
            this.round3 = response4.data.toString().split(',');
            $http.get('/api/masterbracket?round=4').then(response5 => {
              this.round4 = response5.data.toString().split(',');
              $http.get('/api/masterbracket?round=5').then(response6 => {
                this.round5 = response6.data.toString().split(',');
                $http.get('/api/masterbracket?round=6').then(response7 => {
                  this.round6 = response7.data.toString().split(',');
                  for (var a = 0; a < this.brackets.length; a++) {

                    var eliminatedTeams = [];
                    var i = 0;

                    for ( i = 0; i < 32; i++) {
                      var id = this.brackets[a].name + i + '32';
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
                      var id = this.brackets[a].name + i + '16';
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
                      var id = this.brackets[a].name + i + '8';
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
                      var id = this.brackets[a].name + i + '4';
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
                      var id = this.brackets[a].name + i + '2';
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
                      var id = this.brackets[a].name + i + '1';
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

  deleteBracket(index) {
    var object = {};
    object.index = index;
    if(confirm('Are you sure you want to delete this bracket? Your entry fee will not be refunded.')) {
      this.$http.post('/api/users/deletebracket', object).then(response => {
        this.brackets = response.data;
      });
    }
  }
}

angular.module('tournamentChallengeApp')
  .controller('MybracketsCtrl', MybracketsController);

})();
