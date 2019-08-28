var app = angular.module("mainApp",[]);
app.service("mainService", function($http){
	this.sqaureofnumber =  function (x){
	return x * x;
	}
});
app.controller("appController",function ($scope,mainService){
	$scope.getresult = mainService.squareofnumber($scope.number);
});