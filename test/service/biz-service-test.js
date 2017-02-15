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
    it('should make a valid POST request', () => {
      let token = 'some token';
      this.$window.localStorage.setItem('token', token);
      let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      };
      let testBiz = {
        name: 'Test Biz',
        EIN: '23-3456789'
      };
      this.$httpBackend.expectPOST(`${__API_URL__}/api/biz`, testBiz, headers)
      .respond(204, {
        _id: '1234abcd',
        name: testBiz.name,
        EIN: testBiz.EIN
      });

      this.bizService.createBiz(testBiz)
      .then( res => {
        expect(res.status).toEqual(204);
        let biz = res.data;
        //NOTE: Checking biz with testBiz is probably
        //      not necessary. Our goal is to test
        //      that the service makes valid HTTP calls.
        expect(biz.name).toEqual(testBiz.name);
      });

      this.$httpBackend.flush();
    });
  });

  describe('#getBiz', () => {
    it('should make a valid GET request', () => {
      let token = 'some token';
      this.$window.localStorage.setItem('token', token);
      let headers = {
        'Accept': 'application/json',
        //NOTE: $http.get omits Content-Type internally.
        //      so we need to leave it out of what's expected.
        // 'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      };
      let exampleBiz = {
        name: 'Example Biz',
        EIN: '12-3456789'
      };

      this.$httpBackend.expectGET(`${__API_URL__}/api/biz`, headers)
      .respond(200, exampleBiz);

      this.bizService.getBiz()
      .then( res => {
        expect(res.status).toEqual(200);
        let biz = res.data;
        expect(biz.name).toEqual(exampleBiz.name);
        expect(biz.EIN).toEqual(exampleBiz.EIN);
        //TODO: Add more fields to check?
      });

      this.$httpBackend.flush();
    });
  });

  describe('#updateBiz', () => {
    it('should make a valid PUT request', () => {
      let token = 'some token';
      this.$window.localStorage.setItem('token', token);
      let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      };
      let update = {
        _id: '12345abcde',
        name: 'Updated name',
        address: '123 Fake St, Springfield, IL'
      };
      this.$httpBackend.expectPUT(`${__API_URL__}/api/biz/${update._id}`, update, headers)
      .respond(202, update);

      this.bizService.updateBiz(update)
      .then( res => {
        expect(res.status).toEqual(202);
        expect(res.data.name).toEqual(update.name);
      });

      this.$httpBackend.flush();
    });
  });

  describe('#findBizs', () => {
    it('should make a valid GET search request', () => {
      let headers = { 'Accept': 'application/json' };
      let query = {
        southwest: { lat: 47, lng: -122 },
        northeast: { lat: 48, lng: -121 }
      };
      let queryStr = 'southwest=47%2C-122&northeast=48%2C-121';
      let url = `${__API_URL__}/api/search?${queryStr}`;

      this.$httpBackend.expectGET(url, headers)
      .respond(200, [
        { _id: 1, name: 'Biz1'},
        { _id: 2, name: 'Biz2'},
        { _id: 3, name: 'Biz3'},
      ]);

      this.bizService.findBizs(query)
      .then( res => {
        console.log('test find biz res:',res);
        // expect(res.status).toEqual(200);
        // expect(res.data.length).toEqual(3);
      });

      this.$httpBackend.flush();
    });
  });
});
