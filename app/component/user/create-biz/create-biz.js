'use strict';

require('./_create-biz.scss');

module.exports = {
  template: require('./create-biz.html'),
  controller: ['$log', '$location', 'bizService', CreateBizController],
  controllerAs: 'createBizCtrl',
  bindings: {
    onDone: '&',
  }
};
function CreateBizController($log, $location, bizService) {
  $log.debug('CreateBizController');

  this.biz = {};

  this.createBiz = function() {
    $log.log('createBizCtrl.createBiz()');

    bizService.createBiz(this.biz)
    .then( biz => {
      $log.log('success', biz);
      this.onDone();
    });
    // .catch( err => {
    //   $log.error('Failure', err);
    // });
  };
}
