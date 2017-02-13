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
		user.username = user.email;
    authService.login(user)
    .then( () => {
      $location.url('/home');
			console.log('you are loggedin');
    })
		.catch( err => {
			 $log.log('err= ', err);
			 alert('username or password is wrong!');
		});
  };

	this.signup = function(user) {
    $log.debug('loginCtrl.signup()');
		user.username = user.email;
    authService.signup(user)
    .then( () => {
      $location.url('/home');
			console.log('you are loggedsign');
    })
		.catch( err => {
			 $log.log('err= ', err);
		});
  };
}
