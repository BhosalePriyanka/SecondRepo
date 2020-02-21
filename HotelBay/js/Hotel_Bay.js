var app = angular.module("myApp",["ngRoute"]);
app.config(function($routeProvider){
	$routeProvider
	.when("/home",{
		templateUrl: "home.html"
		})
	.when("/location",{
		templateUrl: "Location.html"
		})
	.when("/accom",{
		templateUrl: "Accomodation.html"
		})
	.when("/reserv",{
		templateUrl: "ReservationForm.html"
		})
	.when("/contact",{
		templateUrl: "ContactUs.html"
		})
		.otherwise({
			redirectTo: "/home"
		});
});