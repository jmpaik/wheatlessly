'use strict';

require('./_signup.scss');

module.exports = {
  template: require('./signup.html'),
  controller: ['$log', '$window', '$location', 'authService', SignupController],
  controllerAs: 'signupCtrl'
};

function SignupController($log, $window, $location, authService) {
  $log.debug('signupController');
  this.signup = function(user) {
    $log.debug('signupCtrl.signup()');
    if(user.email !== user.emailCopy){
      this.user = angular.copy(this.master);
      alert('email do not match');
      return;
    }
    authService.signup(user)
    .then( () => {
      $window.location.reload();
      $location.path('/business');
      $log.log('you are signin');
      return;
    })
    .catch( err => {
      $log.log('err- ', err);
      if(err.status == 500){
        this.user = angular.copy(this.master);
        return alert('Sorry this email already exist');
      }
      if(err.status == 400){
        return alert('password length should be greater than 3');
      }
    });
  };
}
