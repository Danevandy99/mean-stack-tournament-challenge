'use strict';

class SignupController {
  //start-non-standard
  user = {};
  errors = {};
  submitted = false;
  //end-non-standard

  constructor(Auth, $location, $http) {
    this.Auth = Auth;
    this.$location = $location;
    this.$http = $http;
  }

  register(form) {
    this.submitted = true;

    if (form.$valid) {
      this.Auth.createUser({
        email: this.user.email,
        password: this.user.password
      })
      .then(() => {
        // Account created, redirect to home
        var object = { 
          html: '<div style="background-color: #2980b9; padding: 10px;"> <div style="background-color: #3498db; padding: 10px; color: white; border-top-left-radius: 5px; border-top-right-radius: 5px; border-bottom-right-radius: 5px; border-bottom-left-radius: 5px; text-align: center;"> <h1 style="text-align: center;"><span style="font-size: 24pt;">Welcome!</span></h1> <h2 style="text-align: center;">Thanks for&nbsp;entering the Vanderbilt Tournament Challenge!</h2> <p style="text-align: center;">You can start creating brackets Sunday, March 13th at 10:00 PM EST, and all&nbsp;brackets must entered before Thursday, March 17th.</p> <p style="text-align: center;">&nbsp;</p> <p style="text-align: center;"><a style="margin: auto; background-color: white; color: #3498db; text-decoration: none; padding: 7px 20px 7px 20px; border-radius: 5px; text-align: center;" href="http://vanderbilttournamentchallenge.com/mybrackets">Go To Your Brackets</a></p> </div> </div>', 
          subject: 'Welcome!',
          to: this.user.email 
        };
        this.$http.post('/api/news/sendemail', object).success(function(data, status) {
          console.log('Email sent!');     
        });
        this.$location.path('/');
      })
      .catch(err => {
        err = err.data;
        this.errors = {};

        // Update validity of form fields that match the mongoose errors
        angular.forEach(err.errors, (error, field) => {
          form[field].$setValidity('mongoose', false);
          this.errors[field] = error.message;
        });
      });
    }
  }
}

angular.module('tournamentChallengeApp')
  .controller('SignupController', SignupController);
