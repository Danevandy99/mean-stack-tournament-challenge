'use strict';

(function() {

class PrintBracketController {

  constructor($http, Auth) {
    this.$http = $http;
    this.awesomeThings = [];
    this.isLoggedIn = Auth.isLoggedIn;
		this.isAdmin = Auth.isAdmin;
		this.getCurrentUser = Auth.getCurrentUser;
		var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
		this.bracketNumber = vars.number || 0;
		document.querySelector('navbar').style.display = 'none';
		document.querySelector('footer').style.display = 'none';
  }

  print() {
  	document.getElementById('print').classList.add('navbar-fixed-top');
  	document.getElementById('print').style.display = 'none';
  	window.print();
  	document.getElementById('print').style.display = 'block';
  }

  range(count) {
		var ratings = [];
		for (var i = 0; i < count; i += 2) {
			ratings.push(i);
		}
		return ratings;
	}
}

angular.module('tournamentChallengeApp')
  .controller('PrintbracketCtrl', PrintBracketController);

})();
