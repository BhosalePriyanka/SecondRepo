var app = angular.module("myApp",["ngRoute"]);
//This code for routing
app.config(function($routeProvider){
$routeProvider
.when("/home",{
	templateUrl : "home.html"
})
.when("/about",{
	templateUrl : "about_us.html"
})
.when("/contactus",{
	templateUrl : "contact_us.html"
})
.when("/services",{
	templateUrl : "service.html"
})
.when("/careers",{
	templateUrl : "career.html"
})
.otherwise({
    templateUrl : "home.html"
  });
});

app.controller("firstController",function ($scope,$location,$anchorScroll){
	$scope.scrollTo = function (scrollLocation){
		$location.hash(scrollLocation);
		$anchorScroll();
	}
});