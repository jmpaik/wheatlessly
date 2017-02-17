'use strict';

require('./_signup.scss');

module.exports = {
  template: require('./signup.html'),
  controller: ['$log', '$location', 'authService', SignupController],
  controllerAs: 'signupCtrl',
  bindings: {
    onDone: '&'
  }
};

function SignupController($log, $location, authService) {
  $log.debug('signupController');

  this.signup = function(user) {
    $log.debug('signupCtrl.signup()');

    if(user.email !== user.emailCopy){
      this.user = angular.copy(this.master);
      alert('email do not match');
      return;
    }
    console.log(user);
    authService.signup(user)
    .then( () => {
      // $window.location.reload();
      $location.path('/business');
      $log.log('you are signin');
      this.onDone();
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
