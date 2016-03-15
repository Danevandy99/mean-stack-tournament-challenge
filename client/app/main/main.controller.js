'use strict';

(function() {

class MainController {

  constructor($http, Auth) {
    this.$http = $http;
    this.awesomeThings = [];
    this.isLoggedIn = Auth.isLoggedIn;
	this.isAdmin = Auth.isAdmin;
	this.getCurrentUser = Auth.getCurrentUser;

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
}

angular.module('tournamentChallengeApp')
  .controller('MainController', MainController);

})();
