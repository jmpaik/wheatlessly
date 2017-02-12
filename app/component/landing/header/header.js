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
  	this.showSignup = false;
		this.showLogin = false;
};
