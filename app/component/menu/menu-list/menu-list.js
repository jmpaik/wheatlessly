'use strict';

require('./_menu-list.scss');

module.exports = {
  template: require('./menu-list.html'),
  controller: ['$log', '$location', 'bizService', 'picService', menuListController],
  controllerAs: 'menuListCtrl',
  bindings:{
    biz: '<'
  }
};

function menuListController($log, $location, bizService, picService) {
  $log.debug('menuListController');

  this.updatePics = function() {
    console.log('updatePics');
    picService.getPics(this.biz._id)
    .then( biz => {
      console.log(biz);
      this.pics = biz.menuPics.map( menuPic => {
        return menuPic.imageURI;
      });
    });
  };
}
