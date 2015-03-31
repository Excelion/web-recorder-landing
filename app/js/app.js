'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('app', [
    'ngRoute',
    'ngStorage',
    'ui.router',
    'landingPageControllers',
    'app.version'
]);

// from https://blog.mariusschulz.com/2014/10/22/asynchronously-bootstrapping-angularjs-applications-with-server-side-data
angular.element(document).ready(function() {
    angular.bootstrap(document, ["app"]);
});

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

    var pageIdState = {
        name: 'pageId', //mandatory. This counter-intuitive requirement addressed in issue #368
        //    parent: home,  //mandatory
        url: '/pageId',
        views: {
            'contentView' : {
                controller: 'PageIdController',
                templateUrl: 'partials/pageId.html'
            },
            menuView : instanceOfMenu
        }
    };

    var pageDetailsState = {
        name: 'pageDetails', //mandatory. This counter-intuitive requirement addressed in issue #368
        //    parent: home,  //mandatory
        url: '/pageDetails/:id',
        views: {
            'contentView' : {
                controller: 'PageDetailsController',
                templateUrl: 'partials/pageDetails.html'
            },
            menuView : instanceOfMenu
        }
    };
    var longLoagingState = {
        name: 'loadTimeout', //mandatory. This counter-intuitive requirement addressed in issue #368
        //    parent: home,  //mandatory
        url: '/loadTimeout',
        views: {
            'contentView' : {
                controller: 'PageLoadTimeoutController',
                templateUrl: 'partials/loadTimeout.html'
            },
            menuView : instanceOfMenu
        }
    };
  $stateProvider
      .state(homeState)
      .state(firstState)
      .state(secondState)
      .state(pageIdState)
      .state(pageDetailsState)
      .state(longLoagingState);

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

app.directive('validNumber', function() {
    return {
        require: '?ngModel',
        link: function(scope, element, attrs, ngModelCtrl) {
            if(!ngModelCtrl) {
                return;
            }

            ngModelCtrl.$parsers.push(function(val) {
                if (angular.isUndefined(val)) {
                    var val = '';
                }
                var clean = val.replace( /[^0-9]+/g, '');
                if (val !== clean) {
                    ngModelCtrl.$setViewValue(clean);
                    ngModelCtrl.$render();
                }
                return clean;
            });

            element.bind('keypress', function(event) {
                if(event.keyCode === 32) {
                    event.preventDefault();
                }
            });
        }
    };
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
