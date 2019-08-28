var app = angular.module("myApp",["ngRoute"]);
app.config(function($routeProvider){
	$routeProvider
	.when("/home",{
		templateUrl: "home.html"
		})
	.when("/location",{
		templateUrl: "Location.html"
		})
	.when("/accomodation",{
		templateUrl: "Accomodation.html"
		})
	.when("/reservationForm",{
		templateUrl: "ReservationForm.html"
		})
	.when("/contactUs",{
		templateUrl: "ContactUs.html"
		});
});