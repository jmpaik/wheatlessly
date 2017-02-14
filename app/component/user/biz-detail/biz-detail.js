'use strict';

require('./_biz-detail.scss');

module.exports = {
  template: require('./biz-detail.html'),
  controller: ['$log', 'authService', 'bizService', bizDetailController],
  controllerAs: 'bizDetailCtrl'
};

function bizDetailController($log, authService, bizService){
  $log.debug('bizDetailController');

  this.biz = {};

  bizService.getBiz()
  .then( () => {
    this.biz = biz;
  });

};
