'use strict';

require('./_home.scss');

module.exports = ['$log', '$location', '$rootScope', 'authService', homeController];

function homeController($log, $location){
  $log.debug('homeController');

  let url = $location.url();
  this.showHome = url === '' || '/home' || '/';
}
