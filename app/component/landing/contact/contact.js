'use strict';

require('./_contact.scss');

module.exports = {
  template: require('./contact.html'),
  controller: ['$log', '$location', ContactController],
  controllerAs: 'contactCtrl'
}
