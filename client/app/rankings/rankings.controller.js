'use strict';

(function() {

class RankingsController {

  constructor($http, Auth) {
    this.$http = $http;
    this.awesomeThings = [];
    this.isLoggedIn = Auth.isLoggedIn;
	   this.isAdmin = Auth.isAdmin;
	   this.getCurrentUser = Auth.getCurrentUser;
     this.brackets = [];
     this.masterbracket = [];

    $http.get('/api/rankings/getrankings').then(response2 => {
      this.brackets = response2.data;
      $http.get('/api/masterbracket?round=1').then(response => {
        for (var a = 0; a < this.brackets.length; a++) {
          for (var i = 0; i < 32; i++) {
            var id = this.brackets[a].name + i + '32';
            var value = document.getElementById(id).value;
            if (response.data.toString().split(',')[i] == '') {
              document.getElementById(id).style.backgroundColor = '#3498db';
            } else if (response.data.toString().split(',')[i] === value) {
              document.getElementById(id).style.backgroundColor = '#2ecc71';
              document.getElementById(id).style.borderColor = '#27ae60';
            } else {
              document.getElementById(id).style.backgroundColor = '#e74c3c';
              document.getElementById(id).style.borderColor = '#c0392b';
            }
          }
        }
      });

      $http.get('/api/masterbracket?round=2').then(response => {
        for (var a = 0; a < this.brackets.length; a++) {
          for (var i = 0; i < 16; i++) {
            var id = this.brackets[a].name + i + '16';
            var value = document.getElementById(id).value;
            if (response.data.toString().split(',')[i] == '') {
              document.getElementById(id).style.backgroundColor = '#3498db';
            } else if (response.data.toString().split(',')[i] === value) {
              document.getElementById(id).style.backgroundColor = '#2ecc71';
              document.getElementById(id).style.borderColor = '#27ae60';
            } else {
              document.getElementById(id).style.backgroundColor = '#e74c3c';
              document.getElementById(id).style.borderColor = '#c0392b';
            }
          }
        }
      });

      $http.get('/api/masterbracket?round=3').then(response => {
        for (var a = 0; a < this.brackets.length; a++) {
          for (var i = 0; i < 8; i++) {
            var id = this.brackets[a].name + i + '8';
            var value = document.getElementById(id).value;
            if (response.data.toString().split(',')[i] == '') {
              document.getElementById(id).style.backgroundColor = '#3498db';
            } else if (response.data.toString().split(',')[i] === value) {
              document.getElementById(id).style.backgroundColor = '#2ecc71';
              document.getElementById(id).style.borderColor = '#27ae60';
            } else {
              document.getElementById(id).style.backgroundColor = '#e74c3c';
              document.getElementById(id).style.borderColor = '#c0392b';
            }
          }
        }
      });

      $http.get('/api/masterbracket?round=4').then(response => {
        for (var a = 0; a < this.brackets.length; a++) {
          for (var i = 0; i < 4; i++) {
            var id = this.brackets[a].name + i + '4';
            var value = document.getElementById(id).value;
            if (response.data.toString().split(',')[i] == '') {
              document.getElementById(id).style.backgroundColor = '#3498db';
            } else if (response.data.toString().split(',')[i] === value) {
              document.getElementById(id).style.backgroundColor = '#2ecc71';
              document.getElementById(id).style.borderColor = '#27ae60';
            } else {
              document.getElementById(id).style.backgroundColor = '#e74c3c';
              document.getElementById(id).style.borderColor = '#c0392b';
            }
          }
        }
      });

      $http.get('/api/masterbracket?round=5').then(response => {
        for (var a = 0; a < this.brackets.length; a++) {
          for (var i = 0; i < 2; i++) {
            var id = this.brackets[a].name + i + '2';
            var value = document.getElementById(id).value;
            if (response.data.toString().split(',')[i] == '') {
              document.getElementById(id).style.backgroundColor = '#3498db';
            } else if (response.data.toString().split(',')[i] === value) {
              document.getElementById(id).style.backgroundColor = '#2ecc71';
              document.getElementById(id).style.borderColor = '#27ae60';
            } else {
              document.getElementById(id).style.backgroundColor = '#e74c3c';
              document.getElementById(id).style.borderColor = '#c0392b';
            }
          }
        }
      });

      $http.get('/api/masterbracket?round=6').then(response => {
        for (var a = 0; a < this.brackets.length; a++) {
          for (var i = 0; i < 1; i++) {
            var id = this.brackets[a].name + i + '1';
            var value = document.getElementById(id).value;
            if (response.data.toString().split(',')[i] == '') {
              document.getElementById(id).style.backgroundColor = '#3498db';
            } else if (response.data.toString().split(',')[i] === value) {
              document.getElementById(id).style.backgroundColor = '#2ecc71';
              document.getElementById(id).style.borderColor = '#27ae60';
            } else {
              document.getElementById(id).style.backgroundColor = '#e74c3c';
              document.getElementById(id).style.borderColor = '#c0392b';
            }
          }
        }
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
  .controller('RankingsCtrl', RankingsController);

})();
