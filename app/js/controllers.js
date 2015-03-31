/**
 * Created by gsk on 3/31/2015.
 */
'use strict';

var landingPageControllers = angular.module('landingPageControllers',  ['ui.router']);


landingPageControllers.controller('HomeController', function ($scope, $state) {

    $scope.now = new Date();

});


landingPageControllers.controller('PageLoadTimeoutController', function ($scope, $state, $timeout) {
    $scope.loadCompleted = false;
    $timeout(function(){   // simulate HTTP delay
        $scope.loadCompleted = true;
    }, 10000);
    $scope.now = new Date();

});
landingPageControllers.controller('MenuController', function ($scope, $state, $window, $location) {

    $scope.availableLinks = ["pageId", "loadTimeout", "second" , "first", "home"];

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

var newPageDetails = function(evt, $scope, $localStorage, $window) {
    var counter =  $scope.startCountFrom;
    $localStorage.startCountFrom = JSON.stringify(counter);


    $scope.startCountFrom =  counter + 1;
    if (evt.which == 1) {
        history.pushState(null, null, '#/pageDetails/' + counter);

        $window.location.reload();
        evt.preventDefault();
    }
};

landingPageControllers.controller('PageIdController',  function($scope, $localStorage, $window) {


    $scope.resetCounter = function() {
        $localStorage.startCountFrom = 1;
        $scope.startCountFrom =  1;
    };

    $scope.openPageId = function(evt) {
        newPageDetails(evt, $scope, $localStorage, $window)
    };

    if (!$localStorage.startCountFrom)
    {
        $localStorage.startCountFrom = JSON.stringify(1);
    }

    $scope.startCountFrom = JSON.parse($localStorage.startCountFrom);
});


landingPageControllers.controller('PageDetailsController',  function($scope, $localStorage, $window, $stateParams) {
    if (!$localStorage.startCountFrom)
    {
        $localStorage.startCountFrom = JSON.stringify(1);
    }


        if (parseInt($localStorage.startCountFrom) > parseInt($stateParams.id)) {
            $scope.id = parseInt($localStorage.startCountFrom);
        }
        else {
            $scope.id = parseInt($stateParams.id);
        }

    $scope.startCountFrom =  $scope.id + 1;
    $localStorage.startCountFrom =  JSON.stringify($scope.startCountFrom);

    $scope.resetCounter = function() {
        $localStorage.startCountFrom = JSON.stringify(1);
        $scope.startCountFrom =  1;
    };

    $scope.openPageId = function(evt) {
        newPageDetails(evt, $scope, $localStorage, $window)
    };


});