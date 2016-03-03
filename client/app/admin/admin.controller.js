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
  }

  delete(user) {
    user.$remove();
    this.users.splice(this.users.indexOf(user), 1);
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
