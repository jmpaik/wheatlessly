'use strict';

describe('Biz Service', function() {
  beforeEach( () => {
    angular.mock.module('wheatlessly');
    angular.mock.inject(($rootScope, bizService, $window, $httpBackend) => {
      this.$window = $window;
      this.$rootScope = $rootScope;
      this.bizService = bizService;
      this.$httpBackend = $httpBackend;
    });
  });

  describe('#createBiz', () => {
    // it('should create a biz', () => {
    //
    // });
  });

  describe('#getBiz', () => {
    it('should make a valid GET request', () => {
      let token = 'some token';
      this.$window.localStorage.setItem('token', token);
      let headers = {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      };
      let exampleBiz = {
        name: 'Example Biz',
        EIN: '12-3456789'
      };

      this.$httpBackend.expectGET(`${__API_URL__}/api/biz`, headers)
      .respond(200, exampleBiz);

      this.bizService.getBiz()
      .then( biz => {
        expect(biz).to.deep.equal(exampleBiz);
      });
    });
  });

  describe('#findBizs', () => {

  });
});
