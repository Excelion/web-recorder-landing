'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('app', [
    'ngRoute',
    'ui.router',
    'landingPageControllers',
    'app.version'
]);

//app.config(function($routeProvider, $locationProvider) {
//
//
//  //$routeProvider
//  //    .when(
//  //    '/', {
//  //      redirectTo: '/home'
//  //    })
//  //    .when('/home', {
//  //      templateUrl: 'partials/home.html'
//  //    })
//  //    .when('/home/first', {
//  //      templateUrl: 'partials/first.html'
//  //    })
//  //    .when('/home/second', {
//  //      templateUrl: 'partials/second.html'
//  //    })
//  //    .otherwise({
//  //      redirectTo: '/home'
//  //    });
//  //    $locationProvider.html5Mode(true);
//  //
//  //  }
//
//    $locationProvider.html5Mode(true);
//});

app.config(function($stateProvider, $urlRouterProvider, $sceProvider) {

  // For any unmatched url, redirect to /somepage
  $urlRouterProvider.otherwise("/home");

  $stateProvider
      .state('home', {
          url: '/home',
          templateUrl: 'partials/home.html'
      })
      .state('first', {
          url: '/first',
          templateUrl: 'partials/first.html'
      })
      .state('second', {
          url: '/second',
          templateUrl: 'partials/second.html'
      })});
