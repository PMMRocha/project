myApp.controller(

	'ResultsController',

	[
		'$scope',
        '$rootScope',
        '$http',
        '$routeParams',
        '$location',

		function ( $scope, $rootScope, $http, $routeParams, $location )
		{
            $scope.city_par = $routeParams.city;
            var result = checkCity($scope.city_par);
            
            if (result.length == 0)
            {
                $('#results_box').hide();
                $('#not_found_msg').html("Nothing found for: " + $scope.city_par);
            }
            else
            {
                $('#results_box').show();
                $('#not_found_msg').html('');
                $rootScope.city_result = checkCity($scope.city_par);
            }

            
            function checkCity (value)
            {
                var valid_cities = [];

                for (var i = 0; i < $rootScope.cities.length; i++)
                {
                    var city = $rootScope.cities[i].name.toLowerCase();
                    
                    if (city == value.toLowerCase() || city.includes(value.toLowerCase()))
                    {
                        valid_cities.push($rootScope.cities[i]);
                    }
                }

                return valid_cities;
            }
            

			$scope.getWeather = function ( city )
            {
                // get data from json file
                var id = city.id;
                var end_point = "http://api.openweathermap.org/data/2.5/forecast?id="
                                + id +
                                "&appid=15b6894fa6c0db2375b0bf3d182f1c0e";

                $http.get(end_point)
                    .then( function (response)
                    {
                        $rootScope.city_selected = response.data;
                        $location.path('/' + $rootScope.city_selected.city.name + '/0');
                    }
                );
            }
		}
	]

);
