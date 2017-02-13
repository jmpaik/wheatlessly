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

  return service;
}
