'use strict';

require('./_header.scss');

module.exports = {
  template: require('./header.html'),
  controller: ['$log', 'authService', headerController],
  controllerAs: 'headerCtrl'
};

function headerController($log){
		$log.debug('headerController');
};
