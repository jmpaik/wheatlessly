'use strict';

require('./_edit-biz.scss');

module.exports = {
  template: require('./edit-biz.html'),
  controller: ['$log', '$rootScope','$location', '$window','bizService', editBizController],
  controllerAs: 'editBizCtrl',
  bindings:{
    biz: '<',
    onDone: '&'
  }
};
function editBizController($log, $rootScope, $location, $window, bizService) {
  $log.debug('editBizController');

  this.biz = {};

  this.updateBiz = function() {
    bizService.updateBiz(this.biz)
    .then( biz => {
      this.biz = biz;
      this.onDone();
      // $window.location.reload();
    })
    .catch( err => {
      $log.error('Failure', err);
    });
  };
}
