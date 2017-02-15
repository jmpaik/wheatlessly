'use strict';

require('./_biz.scss');

module.exports = ['$log', '$location', 'authService', 'bizService', BizController];

function BizController($log, $location, authService, bizService) {
  $log.debug('BizController');

  this.showBiz = false;
  authService.getToken().then( () => {
    this.showBiz = true;
  });

  bizService.getBiz()
  .then( biz => {
    $log.log('Success', biz);
    this.biz = biz;
    if(biz.length > 0){
      return this.hideBizDetail = true;
    }
  })
  .catch( err => {
    if(err.data == null){
      this.hideBizDetail = true;
    }
    $log.error('Failure', err);
  });
}
