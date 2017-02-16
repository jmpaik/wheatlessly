'use strict';

require('./_home.scss');

module.exports = ['$log', '$location', '$rootScope', 'authService', homeController];

function homeController($log, $location, $rootScope){
  $log.debug('homeController');

  let url = $location.url();
  this.showHome = url === '' || '/home' || '/';
  console.log('rootScope signup== ******', $rootScope.signup, 'rootScope-- ', $rootScope);
}
