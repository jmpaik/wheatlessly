'use strict';

require('./_signup.scss');

module.exports = {
  template: require('./signup.html'),
  controller: ['$log', '$location', 'authService', SignupController],
  controllerAs: 'signupCtrl'
};

function SignupController($log, $location, authService) {
  $log.debug('signupController');

  authService.getToken()
  .then( () => {
    $location.url('/home');
  });

  this.signup = function(user) {
    $log.debug('signupCtrl.signup()');

    if(user.email !== user.emailCopy){
      this.user = angular.copy(this.master);
      alert('email do not match');
      return;
    }
    authService.signup(user)
    .then( () => {
      $location.url('/create-biz');
    })
    .catch( err => {
      $log.log('err= ', err);
    });
  };
}
