'use strict';

require('./_create-biz.scss');

module.exports = {
  template: require('./create-biz.html'),
  controller: ['$log', 'authService', 'bizService', CreateBizController],
  controllerAs: 'createBizCtrl'
};

function CreateBizController($log, authService, bizService) {
  $log.debug('CreateBizController');
  this.showBiz = false;
  authService.getToken().then( () => {
    this.showBiz = true;
  });

  this.biz = {};

  this.createBiz = function() {
    bizService.createBiz(this.biz)
    .then( () => {
      this.biz.name = null;
      this.biz.ein = null;
      this.biz.address = null;
      this.biz.phone = null;
      this.biz.url = null;
    });
  };
}
