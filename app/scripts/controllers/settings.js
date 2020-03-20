'use strict';
/**
 * @ngdoc function 
 * @name docketrApp.controller:AboutCtrl 
 * @description 
 * # AboutCtrl 
 *  Controller of the docketrApp */

angular.module('docketrApp').controller('SettingsCtrl', function ($scope, $alert, Products, Shifts) {
    $scope.master = Products.listAll(); $scope.master.$promise.then(function () { $scope.products = angular.copy($scope.master); }); $scope.reset = function () {
        $scope.products = angular.copy($scope.master);
    };

    $scope.save = function () {
        Products.save({ products: $scope.products }, function () {
            console.log('saved');
            // Service usage                  
            var myAlert = $alert({
                title: 'The One Technica', content: 'Saved!', duration: 2, placement: 'top', type: 'success', keyboard: false, show: true
            });
        });
    };

    $scope.restartShift = function () {
        Shifts.restart().then(function (resp) {
            $scope.shift = resp.data;
            $scope.shift.end_docket_id = parseInt($scope.shift.start_docket_id) + parseInt($scope.shift.count);
            Shifts.get($scope.shift.id - 1).then(function (resp) {
                $scope.shift0 = resp.data;
                $scope.shift0.end_docket_id = parseInt($scope.shift0.start_docket_id) + parseInt($scope.shift0.count);
            });
        });
    };

    $scope.add = function (data) {
        let promise = Shifts.add(data);
        promise.then(function () {
            Shifts.current().then(function (resp) {
                $scope.shift = resp.data;
                $scope.shift.end_docket_id = parseInt($scope.shift.start_docket_id) + parseInt($scope.shift.count);
                console.log(resp);
            });
        });
    };

    $scope.shift = {}; $scope.shift0 = {}; Shifts.current().then(function (resp) {
        $scope.shift = resp.data;
        $scope.shift.end_docket_id = parseInt($scope.shift.start_docket_id) + parseInt($scope.shift.count);
        //console.log(resp);
        Shifts.get($scope.shift.id - 1).then(function (resp) {
            $scope.shift0 = resp.data;
            $scope.shift0.end_docket_id = parseInt($scope.shift0.start_docket_id) + parseInt($scope.shift0.count);
        });
    });
});