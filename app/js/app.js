'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('app', [
    'ngRoute',
    'ui.router',
    'landingPageControllers',
    'app.version'
]);




app.config(function($stateProvider,  $provide, $urlRouterProvider, $sceProvider, $routeProvider, $locationProvider) {

  // For any unmatched url, redirect to /somepage
 // $urlRouterProvider.otherwise("/home");
    var instanceOfMenu =  {
        templateUrl: 'partials/menu.html',
        controller: 'MenuController'
    };

    var homeState = {
        name: 'home',  //mandatory
        url: '/home',
        views: {
            'contentView' : {
                controller: 'HomeController',
                templateUrl: 'partials/home.html'
            },
            menuView : instanceOfMenu
        }
    };

    var firstState  = {
        name: 'first', //mandatory. This counter-intuitive requirement addressed in issue #368
    //    parent: home,  //mandatory
        url: '/first',
        views: {
            'contentView' : {
                controller: 'FirstController',
                templateUrl: 'partials/first.html'
            },
            menuView : instanceOfMenu
        }
    };


    var secondState = {
        name: 'second', //mandatory. This counter-intuitive requirement addressed in issue #368
    //    parent: home,  //mandatory
       url: '/second',
        views: {
            'contentView' : {
                controller: 'SecondController',
                templateUrl: 'partials/second.html'
            },
            menuView : instanceOfMenu
        }
    };

  $stateProvider
      .state(homeState)
      .state(firstState)
      .state(secondState);

    $urlRouterProvider.when('', '/home')

   // $locationProvider.html5Mode(true);

   // $urlRouterProvider.when('', '/home');

});
app.config(function($provide) {
    $provide.decorator('$state', function($delegate, $stateParams) {
        $delegate.forceReload = function() {
            return $delegate.go($delegate.current, $stateParams, {
                reload: true,
                inherit: false,
                notify: true
            });
        };
        return $delegate;
    });
});

app.run(function($rootScope, $state, $window) {

    $rootScope.time = new Date().toLocaleTimeString();

    //$rootScope.$on("$locationChangeStart", function(event, next, current) {
    //    if(next==current && next=='/first') {
    //        event.preventDefault();
    //        $state.go('home');
    //    }
    //});
});
