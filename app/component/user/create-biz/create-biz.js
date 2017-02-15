'use strict';

require('./_create-biz.scss');

module.exports = {
  template: require('./create-biz.html'),
  controller: ['$log', '$location', 'bizService', CreateBizController],
  controllerAs: 'createBizCtrl'
};
function CreateBizController($log, $location, bizService) {
  $log.debug('CreateBizController');

  this.createBiz = function(biz) {
    bizService.createBiz(biz)
    .then( biz => {
      this.biz = biz;
      $location.reload();
    })
    .catch( err => {
      $log.error('Failure', err);
    });
  };
}
