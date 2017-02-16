'use strict';

require('./_press.scss');

module.exports = {
  template: require('./press.html'),
  controller: ['$log', '$location',PressController],
  controllerAs: 'pressCtrl'
}

function PressController($log, $location){
  $log.log('PressController');
}
