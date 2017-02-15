'use strict';

require('./_edit-biz.scss');

module.exports = {
  template: require('./edit-biz.html'),
  controller: ['$log', '$location', 'bizService', editBizController],
  controllerAs: 'editBizCtrl'
};
function editBizController($log, $location, bizService) {
  $log.debug('editBizController');

  this.updateBiz = function(biz) {
    bizService.updateBiz(biz)
    .then( biz => {
      this.biz = biz;
      $location.reload();
    })
    .catch( err => {
      $log.error('Failure', err);
    });
  };
}
