'use strict';

// To add:
//   make pics blow up

require('./_menu-list.scss');

module.exports = {
  template: require('./menu-list.html'),
  controller: ['$log', '$location', '$uibModal', 'bizService', 'picService', menuListController],
  controllerAs: 'menuListCtrl',
  bindings:{
    biz: '<'
  }
};

function menuListController($log, $location, $uibModal, bizService, picService) {
  $log.debug('menuListController');

  this.pic = {};
  this.pics = {};

  this.popup = function(picURL) {
    console.log('popup, url:', picURL);

    this.dialog = $uibModal.open({
      component: 'modal',
      resolve: {
        'picURL' : function(){
          return picURL;
        }
      }
    });

  };

  this.close = function() {
    console.log('close');

    this.dialog.close();

  };

  this.upload = function() {
    console.log('menuListController.upload()');

    picService.uploadPic(this.biz, this.pic)
    .then( () => {
      this.updatePics();
    });
  };

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

  this.$onInit = function() {
    console.log('menu init');

    this.updatePics();
  };
}
