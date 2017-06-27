var myApp = angular.module('myApp', ['ngRoute', 'ngAnimate']);

myApp.run(
	[
		'$rootScope',

		function ($rootScope)
		{
			$rootScope.search = "";
			$rootScope.cities = [];
			$rootScope.city_result = [];
			$rootScope.city_selected = {};
		}
	]
);

myApp.config(

	[
		'$routeProvider',
        '$locationProvider',

		function ( $routeProvider, $locationProvider )
		{
			$routeProvider.
				when(
					'/',
					{
						templateUrl: "../templates/search.html",
						controller: "SearchController"
					}
				).
				when(
					'/results/:city',
					{
						templateUrl: "../templates/results.html",
						controller: "ResultsController"
					}
				).
				when(
					'/:city/:day',
					{
						templateUrl: "../templates/weather.html",
						controller: "WeatherController"
					}
				).
				otherwise(
					{
						redirectTo: "/"
					}
				);
            
            $locationProvider.html5Mode(true);
		}
	]

);