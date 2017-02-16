'use strict';

require('./_press.scss');

module.exports = {
  template: require('./press.html'),
  controller: ['$log', '$location',PressController],
  controllerAs: 'pressCtrl'
}
