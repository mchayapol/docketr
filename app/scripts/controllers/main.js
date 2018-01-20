'use strict';

/**
 * @ngdoc function
 * @name docketrApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the docketrApp
 */
angular.module('docketrApp')
.run(function ($rootScope, Products) {
    /* DEBUG
    $rootScope.company = {
        name: 'หจก.เดอะวันปิโตรเลียม',
        branch: 2,
        address: '9/7 หมู่ 3 ถ.สุขุมวิท ต.ห้วยกะปิ อ.เมือง จ.ชลบุรี 20000',
        tel: '086-4069062',
        taxNo: '0203556007965'
    };
    */

    /* DEBUG
    $rootScope.products = [
          { id: 1, name: 'แก๊ซโซฮอล 95', price: 24.5, amount: 100.25 },
		  { id: 2, name: 'แก๊ซโซฮอล 91', price: 21.5, amount: null },
		  { id: 3, name: 'แก๊ซโซฮอล E20', price: 20.5, amount: null },
		  { id: 4, name: 'ดีเซล', price: 21.3, amount: null },
		  { id: 5, name: 'ดีเซลพลัส', price: 24.5, amount: null }
    ];
    */
    /* DEBUG
    $rootScope.customers = [
		{
		    carPlateNo: 'ศร 8290',
		    name: 'หจก. เดอะวันปิโตรเลียม',
		    branch: 0,
		    taxNo: '200188712454',
		    address: '9/7 หมู่ 3 ต.ห้วยกะปิ อ.เมือง จ.ชลบุรี 20000'
		},
		{
		    carPlateNo: '3 กส 382',
		    name: 'หจก. กรีนเอิร์ธปิโตรเลียม (ประเทศไทย)',
		    branch: 0,
		    taxNo: '12345787154',
		    address: '17/80 หมู่ 1 ต.ตลาดขวัญ อ.เมือง จ.นนทบุรี 11000'
		}
    ];
    */
})
.filter('branchlabel', function () {
        function branchlabelFilter(input) {
            if (input === 0 || input === '0') {
                return 'สำนักงานใหญ่';
            } else {
                return 'สาขา ' + input;
            }
        }
        branchlabelFilter.$stateful = true;

        return branchlabelFilter;
    })
.controller('MainCtrl', function ($scope, $window, $resource, $alert, Products, Customers, Dockets, Shifts) {
    $scope.search = {
        option: 'name'
    };

    $scope.date = (new Date()).toLocaleString("en-Gb");
    $scope.company = $resource('company.json').get();
    /*
    $scope.newId = function () {
        var date = new Date();
        return date.getFullYear() + ((date.getMonth() < 10 ? '0' : '') + (date.getMonth() + 1)) + ((date.getDate() < 10 ? '0' : '') + date.getDate()) + '-' + date.getHours() + date.getMinutes() + date.getSeconds();
    };
    */
    $scope.newId = Dockets.getNewId().then(function (res) {
        $scope.newId = res.data;
        console.log($scope.newId);
    });

    // Load data
    $scope.products = Products.listAll();
    $scope.customers = Customers.listAll();
    $scope.selectedCustomer = {};

    // DEBUG
    //$scope.selectedCustomer = $scope.customers[1];

    $scope.totalAmount = function () {
        var total = 0;
        $scope.products.forEach(function (item, index) {
            total += item.amount;
        });
        return total;
    };

    function BAHTTEXT(num, suffix) {
        num = num.toString().replace(/[, ]/g, ''); // remove commas, spaces
        if (isNaN(num) || parseFloat(num) == 0) {
            return 'ศูนย์บาทถ้วน';
        } else {
            var t = ['', 'สิบ', 'ร้อย', 'พัน', 'หมื่น', 'แสน', 'ล้าน'];
            var n = ['', 'หนึ่ง', 'สอง', 'สาม', 'สี่', 'ห้า', 'หก', 'เจ็ด', 'แปด', 'เก้า'];

            suffix = suffix ? suffix : 'บาทถ้วน';
            if (num.indexOf('.') > -1) { // have decimal

                var parts = num.toString().split('.');

                // precision-hack; more accurate than parseFloat the whole number
                parts[1] = parseFloat('0.' + parts[1]).toFixed(2).toString().split('.')[1];

                var text = parseInt(parts[0]) ? BAHTTEXT(parts[0]) : '';

                if (parseInt(parts[1]) > 0) {
                    text = text.replace('ถ้วน', '') + BAHTTEXT(parts[1], 'สตางค์');
                }

                return text;

            } else {
                if (num.length > 7) { // more than (or equal to) 10 millions

                    var overflow = num.substring(0, num.length - 6);
                    var remains = num.slice(-6);
                    return BAHTTEXT(overflow).replace('บาทถ้วน', 'ล้าน') + BAHTTEXT(remains).replace('ศูนย์', '');

                } else {

                    var text = "";

                    for (var i = 0; i < num.length; i++) {
                        if (parseInt(num.charAt(i)) > 0) {
                            if (num.length > 2 && i == num.length - 1 && num.charAt(i) == 1 && suffix != 'สตางค์') {
                                text += 'เอ็ด' + t[num.length - 1 - i];
                            } else {
                                text += n[num.charAt(i)] + t[num.length - 1 - i];
                            }
                        }
                    }

                    // grammar correction
                    text = text.replace('หนึ่งสิบ', 'สิบ');
                    text = text.replace('สองสิบ', 'ยี่สิบ');
                    text = text.replace('สิบหนึ่ง', 'สิบเอ็ด');

                    return text + suffix;
                }
            }
        }
    }

    $scope.bahttext = BAHTTEXT;

    $scope.saveAndPrint = function () {
		$scope.date = (new Date()).toLocaleString("en-Gb");
        if (!$scope.selectedCustomer ||
            !$scope.selectedCustomer.name ||
            !$scope.selectedCustomer.branch ||
            !$scope.selectedCustomer.address ||
            !$scope.selectedCustomer.taxNo ||
            $scope.totalAmount() <= 0) {
              var myAlert = $alert({
                  title: 'The One Technica',
                  content: 'ข้อมูลไม่ครบ!',
                  duration: 2,
                  placement: 'top',
                  type: 'info',
                  keyboard: false,
                  show: true
              });
              return;
        }

        //console.log('Print:',$scope.selectedCustomer);
        /*
        var beforePrint = function () {
            console.log('Functionality to run before printing.');
        };
        var afterPrint = function (mql) {
            console.log('Functionality to run after printing');
            console.log(mql);
        };

        if (window.matchMedia) {
            var mediaQueryList = window.matchMedia('print');
            mediaQueryList.addListener(function (mql) {
                if (mql.matches) {
                    beforePrint();
                } else {
                    afterPrint(mql);
                }
            });
        }

        window.onbeforeprint = beforePrint;
        window.onafterprint = afterPrint;
        */
        // Update date/time
        $scope.date = (new Date()).toLocaleString("en-Gb");
        $window.print();
		
        Dockets.getNewId().then(function (res) {
            $scope.newId = res.data;
            console.log($scope.newId,'===',res.data);			
        },function(res) {
			console.log('Error:',res);
		});


        Shifts.add($scope.totalAmount());

      };

      $scope.clearForm = function () {
          $scope.selectedCustomer = {};
          $scope.products.forEach(function (item, index) {
              item.amount = null;
          });
      }

      $scope.clearSearch = function () {
          $scope.selectedCustomer = {};
      }

      $scope.$watch('Products.products', function () {
          Products.refresh().$promise.then(function () {
              $scope.products = Products.listAll();
          });
      });
  });
