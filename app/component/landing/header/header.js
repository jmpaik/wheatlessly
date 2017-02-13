'use strict';

require('./_header.scss');

module.exports = {
  template: require('./header.html'),
  controller: ['$log', '$location', 'authService', headerController],
  controllerAs: 'headerCtrl'
};

function headerController($log, $location){
  $log.debug('headerController');

  this.showLoginPage = function(){

    $location.path('/home');
    this.showLogin = true;
    this.showSignup = false;
  };
  this.showSignupPage = function(){

    $location.path('/home');
    this.showSignup = true;
    this.showLogin = false;
  };

  this.landing = function(){
    this.showLogin = false;
    this.showSignup = false;

    $location.path('/');
  }
};
