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
    $log.log('createBizCtrl.createBiz()');

    bizService.createBiz(biz)
    .then( biz => {
      $log.log('success', biz)
      bizService.getBiz()
      .then(biz => {
        $log.log('success new biz- ', biz);
      })
      .catch( err => {
        $log.error('Failure', err);
      });
    })
    .catch( err => {
      $log.error('Failure', err);
    });
  };
}
