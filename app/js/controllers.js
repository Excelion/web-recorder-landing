/**
 * Created by gsk on 3/31/2015.
 */
'use strict';

var landingPageControllers = angular.module('landingPageControllers',  ['ui.router']);


landingPageControllers.controller('HomeController', function ($scope, $state) {

    $scope.now = new Date();

});

landingPageControllers.controller('MenuController', function ($scope, $state, $window, $location) {

    $scope.availableLinks = ["second" , "first", "home"];

    $scope.boom = function(stateName){
        // this is too light
        var newTarget = $state.get(stateName);

        // $window.location.assign(newTarget.url);
        //$state.redirectTo(newTarget.url);


        history.pushState(null,null,'#/' + stateName);

        $window.location.reload();
    };


});

landingPageControllers.controller('FirstController', ['$scope', function($scope) {

    $scope.x = 'hello';
}]);


landingPageControllers.controller('SecondController', ['$scope', function($scope) {

    $scope.x = 'hello';
}]);