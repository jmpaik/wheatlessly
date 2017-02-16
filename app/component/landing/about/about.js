'use strict';

require('./_about.scss');

module.exports = {
  template: require('./about.html'),
  controller: ['$log', '$location', AboutController],
  controllerAs: 'aboutCtrl'
}

function AboutController($log, $location){
  $log.log('AboutController');
};
