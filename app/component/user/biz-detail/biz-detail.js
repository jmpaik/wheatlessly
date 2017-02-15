'use strict';

require('./_biz-detail.scss');

module.exports = {
  template: require('./biz-detail.html'),
  controller: ['$log', 'bizService', 'picService',bizDetailController],
  controllerAs: 'bizDetailCtrl'
};

function bizDetailController($log, bizService, picService){
  $log.debug('bizDetailController');

  this.biz = {};

  bizService.getBiz()
  .then( biz => {
    $log.log('Success', biz);
    return this.biz = biz;
  })
  .catch( err => {
    $log.error('Failure', err);
  });

  this.addPic = function(){
    picService.addPic()
    .then( pic => {
      $log.log('pic upload');
    })
    .catch( err => {
      $log.error('Failure', err);
    });
  };
};
