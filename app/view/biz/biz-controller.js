'use strict';

require('./_biz.scss');

module.exports = ['$log', '$location', 'authService', 'bizService', BizController];

function BizController($log, $location, authService, bizService) {
  $log.debug('BizController');

  this.showBiz = false;
  authService.getToken().then( () => {
    this.showBiz = true;
  });

  let defaultBiz = {
    name: 'Enter your Business name',
    EIN: 'XX-XXXXXXX',
    address: 'Enter Address',
    url: 'Business website',
    phone: 'xxx-xxx-xxxx'
  }
  // this.hideBizDetail = false;
  bizService.getBiz()
  .then( biz => {
    $log.log('Success', biz);
    this.biz = biz;
    if(biz.length > 0){
      return this.hideBizDetail = true;
    }
    bizService.createBiz(defaultBiz)
    .then(biz => {
      $log.log('success: default business created', biz);
    })
    .catch( err => {
      if(err.data == null){
        this.hideBizDetail = true;
      }
      $log.error('Failure', err);
    });
  })
  .catch( err => {
    if(err.data == null){
      this.hideBizDetail = true;
    }
    $log.error('Failure', err);
  });
}
