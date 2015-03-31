/**
 * Created by gsk on 3/31/2015.
 */
'use strict';

var landingPageControllers = angular.module('landingPageControllers', []);


landingPageControllers.controller('EmptyController', ['$scope', function($scope) {

    $scope.x = 'hello';
}]);