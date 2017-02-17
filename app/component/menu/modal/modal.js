'use strict';

require('./_modal.scss');

module.exports = {
  template: require('./modal.html'),
  controller: ['$log', modalController],
  controllerAs: 'modalCtrl',
  bindings: {
    resolve: '<',
    close: '&',
    dismiss: '&',
  }
};

function modalController($log) {
  $log.debug('modalController(), resolve:', this.resolve);

  //this.picURL = 'http://placehold.it/1500x800';

  this.$onInit = function () {
    this.picURL = this.resolve.picURL;
  };

  this.confirm = function() {
    $log.debug('confirm...');
    this.close();
  };

  this.cancel = function() {
    $log.debug('cancel...');
    this.dismiss();
  };
}
