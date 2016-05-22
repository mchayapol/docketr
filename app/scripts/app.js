'use strict';

/**
 * @ngdoc overview
 * @name docketrApp
 * @description
 * # docketrApp
 *
 * Main module of the application.
 */
angular
  .module('docketrApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
	'mgcrea.ngStrap'
  ])
  .config(function ($routeProvider) {
      $routeProvider
        .when('/', {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl',
            controllerAs: 'main'
        })
        .when('/settings', {
            templateUrl: 'views/settings.html',
            controller: 'SettingsCtrl',
            controllerAs: 'setting'
        })
        .when('/customers', {
            templateUrl: 'views/customers.html',
            controller: 'CustomersCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
  });
