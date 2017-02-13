'use strict';

describe('Auth Service', function() {
  beforeEach( () => {
    angular.mock.module('wheatlessly');
    angular.mock.inject(($rootScope, authService, $window, $httpBackend) => {
      this.$window = $window;
      this.$rootScope = $rootScope;
      this.authService = authService;
      this.$httpBackend = $httpBackend;
    });
  });

  describe('authService.getToken()', () => {
    it('should return a token', () => {
      this.authService.token = null;
      this.$window.localStorage.setItem('token', 'test token');

      this.authService.getToken()
      .then( token => {
        expect(token).toEqual('test token');
      });

      this.$rootScope.$apply();
    });
  }); //getToken

  let testUser = {
    email: 'testuser@test.com',
    password: 'testpass'
  };

  describe('authService.signup()', () => {
    it('should send a user to be signed up', () => {
      let headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      };
      this.$httpBackend.expectPOST(`${__API_URL__}/api/signup`, testUser, headers)
      .respond(200, 'test token');

      this.authService.signup(testUser)
      .then( token => {
        expect(token).toEqual('test token');
      });
      this.$httpBackend.flush();
      this.$rootScope.$apply();
    });
  }); //signup

  describe('authService.login()', () => {
    it('should log the user in and return a token', () => {
      let base64 = this.$window.btoa(`${testUser.email}:${testUser.password}`);
      let headers = {
        'Accept': 'application/json',
        'Authorization': `Basic ${base64}`
      };
      this.$httpBackend.expectGET(`${__API_URL__}/api/signin`, headers)
      .respond(200, 'test token');

      this.authService.login(testUser)
      .then( token => {
        expect(token).toEqual('test token');
      });
    });
  });
});
