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

  this.updatePics = function(biz) {
    console.log('updatePics');
    bizService.getPics(biz._id)
    .then( biz => {
      console.log(biz);
      this.pics = biz.menuPics.map( menuPic => {
        return menuPic.imageURI;
      });
    });
    // .then( biz => {
    //   console.log('biz:', biz);
    //   biz.menuPics.forEach( pic => {
    //     console.log('a pic:', pic);
    //     this.pics.push(pic.imageURI);
    //   });
    // })
    // .catch(err => console.log(err));
  };

  // this.updateBiz = function(biz) {
  //   bizService.updateBiz(biz)
  //   .then( biz => {
  //     this.biz = biz;
  //     $location.reload();
  //   })
  //   .catch( err => {
  //     $log.error('Failure', err);
  //   });
  // };
}
