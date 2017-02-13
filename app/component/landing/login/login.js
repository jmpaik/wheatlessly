'use strict';

require('./_login.scss');

module.exports = {
  template: require('./login.html'),
  controller: ['$log', '$location', 'authService', LoginController],
  controllerAs: 'loginCtrl'
};

function LoginController($log, $location, authService) {
  $log.debug('LoginController');

  authService.getToken()
  .then( () => {
    $location.url('/home');
  });
  this.login = function(user) {
    $log.log('loginCtrl.login()');
    authService.login(user)
    .then( () => {
      $location.url('/home');
			console.log('you are loggedin');
    })
		.catch( err => {
			 $log.log('err= ', err);
			 alert('email or password is wrong!');
		});
  };
}
