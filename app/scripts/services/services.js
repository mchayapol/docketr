'use strict';  /**  * @ngdoc service  * @name docketrApp.services  * @description  * # services  * Service in the docketrApp.  */ angular.module('docketrApp')     .service('Customers', function ($resource) {         var Customers = $resource('http://localhost/docketr_api/customers/:id', {id:'@id'},           {               add: { method: "POST" },               update: {
                  method: "PUT",                   url: 'http://localhost/docketr_api/customers/:id',                   isArray: false
              }           }       );          var self = this;                  self.add = function (customer, cbSuccess, cbError) {             //console.log('add',customer);             customer = angular.copy(customer);             customer.car_plate_no = customer.carPlateNo;             customer.tax_no = customer.taxNo;             //delete customer['carPlateNo'];             delete customer.carPlateNo;             //delete customer['taxNo'];             delete customer.taxNo;             //Customers.add(customer, cbSuccess, cbError);             var c = new Customers(customer);             c.$save(cbSuccess, cbError);         };                  // Update customer         self.save = function (customer, cbSuccess, cbError) {             customer = angular.copy(customer);             customer.car_plate_no = customer.carPlateNo;             customer.tax_no = customer.taxNo;             //delete customer['carPlateNo'];             delete customer.carPlateNo;             //delete customer['taxNo'];             delete customer.taxNo;             Customers.update({ id: customer.id }, customer, cbSuccess, cbError);         };          // Remove customer         self.remove = function (customer, cbSuccess, cbError) {
            var c = Customers.get({ id: customer.id }, function () {
                c.$remove(cbSuccess,cbError);
            });
        };          self.listAll = function () {             return customers;         };          self.refresh = function () {             customers = Customers.query(function () {                 angular.forEach(customers, function (item, index) {                     item.carPlateNo = item.car_plate_no;                     item.taxNo = item.tax_no;                 });             });             return customers;         };          var customers = self.refresh();     })   .service('Products', function ($resource) {       var Products = $resource('http://localhost/docketr_api/products', {},           {               save: { method: "POST", isArray: true }           }       );       var self = this;               self.save = function (products, cbSuccess, cbError) {           products = angular.copy(products);            // Remove amount field in this product collection.           angular.forEach(products.products, function (item, index) {               delete item.amount;
          });           Products.save(products, cbSuccess, cbError);       };        self.listAll = function () {           return products;       };        self.refresh = function () {           products = Products.query(function () {               angular.forEach(products, function (item, index) {                   // convert to numeric                   item.price = Number(item.price);                   item.amount = null;               });           });           return products;       };        var products = self.refresh();    })   .service('Dockets', function ($http) {
      var self = this;       self.getId = function () {
          return $http.get('http://localhost/docketr_api/dockets');
      };        self.getNewId = function () {
          return $http.get('http://localhost/docketr_api/dockets/nextId');
      };   })   .service('Shifts', function ($http) {
      var self = this;       self.add = function (amount) {
          return $http.get('http://localhost/docketr_api/shifts/add?amount='+amount);
      };        self.get = function (id) {
          return $http.get('http://localhost/docketr_api/shifts/' + id);
      };        self.restart = function () {
          return $http.get('http://localhost/docketr_api/shifts/new');
      };        self.current = function () {
          return $http.get('http://localhost/docketr_api/shifts/last');
      };
  }); 