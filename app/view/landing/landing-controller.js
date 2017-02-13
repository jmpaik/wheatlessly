'use strict';

require('./_landing.scss');

module.exports = ['$log', '$location', '$rootScope', 'authService', landingController];

function landingController($log, $location){
  $log.debug('landingController');

  let url = $location.url();
  this.showHome = url === '' || '/landing' || '/';
}
