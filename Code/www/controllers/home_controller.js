app.controller('customerCtrl', function($scope, $window) {

        $scope.formData = {};
        $scope.pagi = {};

        $scope.pagi.perPage = 3;
        $scope.updateValues = function() {
            $scope.savedData = localStorage.getItem('customerInfo');
            $scope.customerDetails = (localStorage.getItem('customerInfo') !== null) ? JSON.parse($scope.savedData.toString()) : [];
            $scope.pagi.items = $scope.customerDetails.length;
            $scope.pagi.pageChanged(1);
        }

        $scope.getId = function() {
            var maxId = _.max($scope.customerDetails, function(list) {
                return list.id
            });
            return (_.isNumber(maxId.id) && maxId.id > 0) ? maxId.id + 1 : 1;
        }

        $scope.goToEdit = function(id) {
            $window.location.href = '#/customer/' + id;
        }



        $scope.pagi.pageChanged = function(page) {
          $scope.onPageData =  $scope.customerDetails.slice( (page - 1) * $scope.pagi.perPage, page * $scope.pagi.perPage)
           
        }

         $scope.pagi.sort = function(keyname) {
            $scope.pagi.sortKey = keyname; //set the sortKey to the param passed
            $scope.reverse = !$scope.reverse; //if true make it false and vice versa
            if($scope.reverse){
                $scope.onPageData = _.sortBy($scope.customerDetails,keyname).reverse();
            }else{
                $scope.onPageData = _.sortBy($scope.customerDetails,keyname);
                
            }    
                
            //$scope.pagi.pageChanged($scope.lastServe);
        }


        $scope.addcustomerInfo = function() {
            var e_status = ($scope.formData.currentStatus == 1) ? true : false;
            var taskObj = {
                id: $scope.getId(),
                name: $scope.formData.customerName,
                lName: $scope.formData.lName,
                email: $scope.formData.email,
                number: $scope.formData.number,
                address: $scope.formData.address
            };
            $scope.customerDetails.push(taskObj);
            $scope.formData = {}; //clear the input after adding
            $scope.save();
        };




        $scope.removecustomerInfo = function(id) {
            angular.forEach($scope.customerDetails, function(emp, index) {
                if (emp.id == id) $scope.customerDetails.splice(index, 1)
            })
            $scope.save();
        }



        $scope.save = function() {
            localStorage.setItem('customerInfo', JSON.stringify($scope.customerDetails));
            $scope.updateValues();
        }



        $scope.updateValues();






    })
    .controller('customerDetailCtrl', function($scope, $window, $stateParams) {

        $scope.saved = false;

        $scope.actionId = parseInt($stateParams.id);
        $scope.savedData = localStorage.getItem('customerInfo');
        $scope.customerDetails = JSON.parse($scope.savedData.toString());
        $scope.customerData = _.find($scope.customerDetails, { "id": $scope.actionId });
        $scope.formData = {};
        $scope.formData.customerName = $scope.customerData.name;
        $scope.formData.lName = $scope.customerData.lName;
        $scope.formData.email = $scope.customerData.email;
        $scope.formData.number = $scope.customerData.number;
        $scope.formData.address = $scope.customerData.address;


        $scope.updateInfo = function() {
           
            angular.forEach($scope.customerDetails, function(item) {
                console.log(item.id, $scope.actionId)
                if (item.id == $scope.actionId) {
                    item.name = $scope.formData.customerName;
                    item.lName = $scope.formData.lName;
                    item.email = $scope.formData.email;
                    item.number = $scope.formData.number;
                    item.address = $scope.formData.address;
                }
            })
            $scope.save();
            $scope.saved = true;
        }


        $scope.save = function() {
            localStorage.setItem('customerInfo', JSON.stringify($scope.customerDetails));
        }

    })
