'use script';

module.exports = ['$q', '$log', '$http', 'authService', bizService];

let baseUrl = `${__API_URL__}/api/biz`;

let headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
};

function bizService($q, $log, $http, authService){
  $log.debug('bizService()');

  let service = {};

  service.searchResults = [];

  service.createBiz = function(biz){
    $log.debug('bizService.createBiz()');

    return authService.getToken()
    .then( token => {
      let url = baseUrl;
      headers.Authorization = `Bearer ${token}`;

      return $http.post(url, biz, headers);
    });
  };

  //TODO: Cache api results until token changes.
  service.getBiz = function() {
    $log.debug('bizService.getBiz()');

    return authService.getToken()
    .then( token => {
      headers.Authorization = `Bearer ${token}`;
      return $http.get(baseUrl, headers);
    });
  };

  service.updateBiz = function(biz) {
    $log.debug('bizService.updateBiz()');

    return authService.getToken()
    .then( token => {
      let url = `baseUrl/${biz._id}`;
      headers.Authorization = `Bearer ${token}`;

      return $http.put(url, biz, headers);
    });
  };

  //param query should be an object
  // { southwest: { lat, lng }, northeast: { lat, lng } }
  service.findBizs = function(query) {
    $log.debug('bizService.findBizs()', query);

    return authService.getToken()
    .then( token => {
      let url = baseUrl;
      headers.Authorization = `Bearer ${token}`;
      let sw = `${query.southwest.lat},${query.southwest.lng}`;
      sw = encodeURIComponent(sw);
      let ne = `${query.northeast.lat},${query.northeast.lng}`;
      ne = encodeURIComponent(ne);

      url += `?southwest=${sw}&northeast=${ne}`;

      $log.debug('Fetching:',url);
      return $http.get(url, headers)
      .then( res => {
        service.searchResults = res;
      });
    });
  };

  service.getPics = function(biz){
    $log.debug('bizService.getPics()');

    return authService.getToken()
    .then( token => {
      let url = baseUrl;
      headers.Authorization = `Bearer ${token}`;

      return $http.post(url, biz, headers);
    });
  };

  return service;
}
