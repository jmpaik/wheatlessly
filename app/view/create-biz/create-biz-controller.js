'use strict';

require('./_create-biz.scss');

module.exports = {
  template: require('./create-biz.html'),
  controller: ['$log', 'bizService', CreateBizController],
  controllerAs: 'createBizCtrl'
};

function CreateBizController($log, bizService) {
  $log.debug('CreateBizController');

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
