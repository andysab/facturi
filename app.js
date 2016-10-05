(function() {

  'use strict';

  angular.module('facturi', ['auth0', 'angular-storage', 'angular-jwt', 'ngMaterial', 'ui.router', 'ngMessages'])
    .config(function($provide, authProvider, $urlRouterProvider, $stateProvider, $httpProvider, jwtInterceptorProvider) {

      authProvider.init({
        domain: 'joebot.eu.auth0.com',
        clientID: 'aHq9UuywZPsFNqO3lUHpDkqBq9vCetk2'
      });

      $urlRouterProvider.otherwise("/home");

      $stateProvider
        .state('home', {
          url: '/home',
          templateUrl: 'templates/home.html'
        })
        .state('profile', {
          url: '/profile',
          templateUrl: 'templates/profile.html',
          controller: 'profileController as user'
        })
        .state('invoice', {
          url: '/invoice',
          templateUrl: 'templates/invoice.html',
          controller: 'invoiceController'
        })
        .state('list', {
          url: '/list',
          templateUrl: 'templates/list.html',
          controller: 'listController'
        })
        .state('createInvoice', {
          url: '/createInvoice',
          templateUrl: 'templates/createInvoice.html',
          controller: 'createInvoiceController'
        })
        ;

      jwtInterceptorProvider.tokenGetter = function(store) {
        return store.get('token');
      }

      function redirect($q, $injector, $timeout, store, $location) {

        var auth;
        $timeout(function() {
          auth = $injector.get('auth');
        });

        return {
          responseError: function(rejection) {

            if (rejection.status === 401) {
              auth.signout();
              store.remove('profile');
              store.remove('token');
              $location.path('/home')
            }
            return $q.reject(rejection);
          }
        }
      }
      $provide.factory('redirect', redirect);
      $httpProvider.interceptors.push('jwtInterceptor');
      $httpProvider.interceptors.push('redirect');
    })
    .run(function($rootScope, $state, auth, store, jwtHelper, $location) {
      $rootScope.$on('$locationChangeStart', function() {
        // Get the JWT that is saved in local storage
        // and if it is there, check whether it is expired.
        // If it isn't, set the user's auth state
        var token = store.get('token');
        if (token) {
          if (!jwtHelper.isTokenExpired(token)) {
            if (!auth.isAuthenticated) {
              auth.authenticate(store.get('profile'), token);
            }
          }
        }

        if (!auth.isAuthenticated) {
          $location.path('/home');
        }
      });
    });

})();