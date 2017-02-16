'use strict';

require('./_login.scss');

module.exports = {
  template: require('./login.html'),
  controller: ['$log', '$location', '$window', 'authService', LoginController],
  controllerAs: 'loginCtrl'
}

function LoginController($log, $location, $window, authService) {
  $log.debug('LoginController');

  this.login = function(user) {
    $log.log('loginCtrl.login()');
    authService.login(user)
    .then( () => {
      $window.location.reload();
      $location.path('/business');
      $log.log('you are loggedin');
      return;
    })
    .catch( err => {
      alert('email or password is wrong!');
      $log.error('failed login:', err);
    });
  };
}
