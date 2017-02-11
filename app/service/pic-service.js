'use strict';

const authService = require('./auth-service.js');

module.exports = ['$q', '$log', '$http', picService];

//For reference:
// module.exports = mongoose.model('pic', mongoose.Schema({
//   userId: { type: Schema.Types.ObjectId, required: true },
//   menuId: { type: Schema.Types.ObjectId, required: true },
//   imageURI: { type: String, required: true, unique: true },
//   objectKey: { type: String, required: true, unique: true },
//   created: { type: Date, default: Date.now }
// }));


function picService($q, $log, $http) {

  $log.debug('pic service');

  let service = {};
  service.pics = [];

  service.addPic = function(pic, menuId) {
    $log.debug('picService.addPic()');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/menu/${menuId}/pic`;
      let config = {
        headers: { //TODO: this should be uploading the pic passed in.
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      return $http.post(url, pic, config);
    })
    .then( res => {
      $log.log('pic created');
      let pic = res.data; //TODO: i dunno
      service.pics.unshift(pic);
      return pic;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.deletePic = function(picId) {
    $log.debug('picService.deletePic()');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/pic/${picId}`;
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      };
      return $http.get(url, config);
    })
    .then( res => {
      $log.log('pic deleted');
      service.pics = res.data;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.getPics = function(picId) {
    $log.debug('picService.getPics()');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/pic/${picId}`;
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      return $http.get(url, config);
    })
    .then( res => {
      $log.log('pics retrieved');
      service.pics = res.data;
      return service.pics;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  return service;
}
