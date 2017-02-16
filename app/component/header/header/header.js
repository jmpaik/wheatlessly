'use strict';

require('./_header.scss');

module.exports = {
  template: require('./header.html'),
  controller: ['$log', '$location', '$rootScope', 'authService', headerController],
  controllerAs: 'headerCtrl'
};

function headerController($log, $location, $rootScope, authService){
  $log.debug('headerController');
  this.loginDiv = false;


  authService.getToken()
  .then( () => {
    $location.path('/business');
    return this.loginDiv = true;
  }).catch( err => $log.log('You are not loggedin, Token not found'));

  this.logout = function(){
    this.loginDiv = false;
    $location.url('/landing');
    authService.logout();
  };
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
  };

  this.business = function(){
    $location.path('/business');
  };
}
