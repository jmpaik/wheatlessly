Biz-service


'use script';

module.exports = ['$q', '$log', '$http', 'authService', bizService];

let baseUrl = `${__API_URL__}/api/biz`;

let headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
};


function bizService($q, $log, $http, authService){
  $log.debug('bizService');

  let service = {};

  service.biz = [];

  service.createBiz = function(biz){
    $log.debug('bizService.createBiz');

    return authService.getToken()
    .then( token => {
      let url = baseUrl;
      headers.Authorization = `Bearer ${token}`;

      return $http.post(url, biz, headers);
    })
    .then( res => {
      $log.debug('biz created');

      let biz = res.data;
      service.biz.unshift(biz);

      return biz;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  return service;
}
