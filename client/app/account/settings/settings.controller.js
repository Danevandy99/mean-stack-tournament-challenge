'use strict';

class SettingsController {
  constructor(Auth, $http) {
    this.errors = {};
    this.submitted = false;
    this.$http = $http;
    this.Auth = Auth;
  }

  changePassword(form) {
    this.submitted = true;

    if (form.$valid) {
      this.Auth.changePassword(this.user.oldPassword, this.user.newPassword)
        .then(() => {
          this.message = 'Password successfully changed.';
        })
        .catch(() => {
          form.password.$setValidity('mongoose', false);
          this.errors.other = 'Incorrect password';
          this.message = '';
        });
    }
  }

  generate() {
    this.$http.get('/api/users/generate').then(response => {
      console.log(JSON.stringify(response));
    })
  }
}

angular.module('tournamentChallengeApp')
  .controller('SettingsController', SettingsController);
