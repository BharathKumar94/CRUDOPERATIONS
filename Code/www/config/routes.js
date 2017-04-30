
app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('customer', {
            controller: 'customerCtrl',
            url: "/customer",
            templateUrl: "templates/home.html"
		})
        .state('customerDetail', {
            controller: 'customerDetailCtrl',
            url: "/customer/:id",
            templateUrl: "templates/edit.html"
		})

    $urlRouterProvider.otherwise("/customer")
})
