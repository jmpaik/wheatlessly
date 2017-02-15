'use strict';

require('./_biz-detail.scss');

module.exports = {
  template: require('./biz-detail.html'),
  controller: ['$log', 'bizService', 'picService', bizDetailController],
  controllerAs: 'bizDetailCtrl',
  bindings: {
    hideBizDetail: '<',
    biz: '<'
  }
};

function bizDetailController($log, bizService, picService){
  $log.debug('bizDetailController');
  this.hideEdit = false;
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
