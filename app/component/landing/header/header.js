'use strict';

require('./_header.scss');

module.exports = {
  template: require('./header.html'),
  controller: ['$log', '$location', 'authService', headerController],
  controllerAs: 'headerCtrl'
};

function headerController($log, $location){
  $log.debug('headerController');

  let url = $location.url();
  this.showLoginPage = function(){

    $location.path('/home');
    this.showLogin = true;
  };

  this.landing = function(){
    this.showLogin = false;

    $location.path('/');
  }
};
