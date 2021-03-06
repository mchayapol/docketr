'use strict';

/**
 * @ngdoc function
 * @name docketrApp.controller:CustomersCtrl
 * @description
 * # CustomersCtrl
 * Controller of the docketrApp
 */
angular.module('docketrApp')
  .controller('CustomersCtrl', function ($scope, $alert, Customers) {
      $scope.search = {
          option: 'name'
      };

      $scope.customers = Customers.listAll();
      $scope.selectedCustomer = {};
      $scope.modeNewCustomer = false;

      $scope.clearSearch = function () {
          $scope.selectedCustomer = {};
      };

      // DEBUG
      $scope.customers.$promise.then(function () {
          $scope.selectedCustomer = $scope.customers[0];
      });

      $scope.newCustomer = function () {
          $scope.selectedCustomer = {};
          $scope.modeNewCustomer = true;
          // DEBUG
          $scope.selectedCustomer = {
              name: '',
              address: '',
              taxNo: '',
              carPlateNo: '',
              branch: 0
          };
      };

      $scope.cancelNewCustomer = function () {
          $scope.selectedCustomer = {};
          $scope.modeNewCustomer = false;
      };

      $scope.addNewCustomer = function () {
          Customers.add($scope.selectedCustomer,
              function () {
                  // success
                  $scope.selectedCustomer = {};
                  $scope.modeNewCustomer = false;
                  $scope.customers = Customers.refresh();

                  $alert({
                      title: 'The One Technica',
                      content: 'Saved!',
                      duration: 2,
                      placement: 'top',
                      type: 'success',
                      keyboard: false,
                      show: true
                  });
              },
          function (resp) {
              $alert({
                  title: 'The One Technica',
                  content: 'Failed! ' + resp,
                  duration: 2,
                  placement: 'top',
                  type: 'success',
                  keyboard: false,
                  show: true
              });
          });
      };

      $scope.saveCustomer = function () {
          Customers.save($scope.selectedCustomer,
              function () {
                  // success
                  $alert({
                      title: 'The One Technica',
                      content: 'Saved!',
                      duration: 2,
                      placement: 'top',
                      type: 'success',
                      keyboard: false,
                      show: true
                  });
              },
          function (resp) {
              $alert({
                  title: 'The One Technica',
                  content: 'Failed! ' + resp,
                  duration: 2,
                  placement: 'top',
                  type: 'success',
                  keyboard: false,
                  show: true
              });
          });
      };

      $scope.deleteCustomer = function () {
          if ($scope.selectedCustomer !== {} && confirm('ท่านแน่ใจว่าจะลบ?')) {
              Customers.remove($scope.selectedCustomer,
              function () {
                  // success
                  $scope.selectedCustomer = {};
                  $scope.customers = Customers.refresh();
                  
                  $alert({
                      title: 'The One Technica',
                      content: 'Delete!',
                      duration: 2,
                      placement: 'top',
                      type: 'success',
                      keyboard: false,
                      show: true
                  });
              },
          function (resp) {
              $alert({
                  title: 'The One Technica',
                  content: 'Failed! ' + resp,
                  duration: 2,
                  placement: 'top',
                  type: 'success',
                  keyboard: false,
                  show: true
              });
          });
          }
      };

      $scope.reset = function () {
          $scope.customers = angular.copy($scope.master);
      };

      $scope.save = function () {
          Customers.save({ customers: $scope.customers },
              function () {
                  console.log('saved');
                  // Service usage
                  var myAlert = $alert({
                      title: 'The One Technica',
                      content: 'Saved!',
                      duration: 2,
                      placement: 'top',
                      type: 'success',
                      keyboard: false,
                      show: true
                  });
              });
      };
  });
