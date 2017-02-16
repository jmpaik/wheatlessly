'use strict';

require('./_edit-biz.scss');

module.exports = {
  template: require('./edit-biz.html'),
  controller: ['$log', '$rootScope','$location', '$window','bizService', editBizController],
  controllerAs: 'editBizCtrl',
  bindings:{
    biz: '<'
  }
};
function editBizController($log, $rootScope, $location, $window, bizService) {
  $log.debug('editBizController');

  this.updateBiz = function(biz) {
    bizService.updateBiz(biz)
    .then( biz => {
      this.biz = biz;
      $window.location.reload();
    })
    .catch( err => {
      $log.error('Failure', err);
    });
  };
}
