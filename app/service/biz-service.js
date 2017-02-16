'use script';

module.exports = ['$q', '$log', '$http', 'authService', bizService];

let baseUrl = `${__API_URL__}/api/biz`;

function makeConfig(token) {
  let config = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  };
  if(token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}

function bizService($q, $log, $http, authService){
  $log.debug('bizService()');

  let service = {};

  service.searchResults = [];

  service.createBiz = function(biz){
    $log.debug('bizService.createBiz()');

    return authService.getToken()
    .then( token => {
      return $http.post(baseUrl, biz, makeConfig(token));
    })
    .then( res => {
      //TODO: Look for error conditions and reject
      return $q.resolve(res.data);
    });
  };

  //TODO: Cache api results until token changes.
  service.getBiz = function() {
    $log.debug('bizService.getBiz()');

    return authService.getToken()
    .then( token => {
      return $http.get(baseUrl, makeConfig(token));
    })
    .then( res => {
      //TODO: Look for error conditions and reject
      return $q.resolve(res.data);
    });
  };

  service.updateBiz = function(biz) {
    $log.debug('bizService.updateBiz()');

    return authService.getToken()
    .then( token => {
      let url = `${baseUrl}/${biz._id}`;
      return $http.put(url, biz, makeConfig(token));
    })
    .then( res => {
      //TODO: Look for error conditions and reject
      return $q.resolve(res.data);
    });
  };

  //param query should be an object
  // { southwest: { lat, lng }, northeast: { lat, lng } }
  service.findBizs = function(query) {
    $log.debug('bizService.findBizs()', query);

    let url = `${__API_URL__}/api/search`;

    let sw = `${query.southwest.lat},${query.southwest.lng}`;
    sw = encodeURIComponent(sw);
    let ne = `${query.northeast.lat},${query.northeast.lng}`;
    ne = encodeURIComponent(ne);

    url += `?southwest=${sw}&northeast=${ne}`;

    $log.debug('Fetching:',url);
    return $http.get(url, makeConfig())
    .then( res => {
      //TODO: Look for error conditions and reject
      service.searchResults = res.data;
      return $q.resolve(res.data);
    });
  };
  return service;
}
