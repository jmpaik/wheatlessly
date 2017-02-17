'use strict';

require('./_biz-detail.scss');

module.exports = {
  template: require('./biz-detail.html'),
  controller: ['$log', bizDetailController],
  controllerAs: 'bizDetailCtrl',
  bindings: {
    biz: '<'
  }
};

function bizDetailController($log) {
  $log.debug('bizDetailController');
  this.editMode = false;
}
