myApp.controller(

	'WeatherController',

	[
		'$scope',
        '$rootScope',
        '$routeParams',

		function ( $scope, $rootScope, $routeParams )
		{
			$scope.city = $rootScope.city_selected.city;
            $scope.temp = $rootScope.city_selected.list;

            var all_dates = getAllDates();
            $scope.days = getAllObj(all_dates);
            $scope.day = $routeParams.day;
            $scope.selected_hour = "selected_hour";
            $scope.time = 0;
            
            
            $scope.changeTime = function ( elem, index )
            {
                $('.selected_hour').removeClass('selected_hour');
                $('#hour_' + elem).addClass('selected_hour');
                $scope.time = index;
            }
            
            
            $scope.checkRain = function ( rain )
            {
                if (jQuery.isEmptyObject(rain))
                {
                    return "0";
                }
                else
                {
                    return rain["3h"];
                }
            }
            
            
            
            // previous day button
            if ($scope.day > 0)
            {
                $scope.prev = Number($scope.day) - 1;
            }
            else
            {
                $scope.prev = 4;
            }

            // next day button
            if ($scope.day < 4)
            {
                $scope.next = Number($scope.day) + 1;
            }
            else
            {
                $scope.next = 0;
            }
            
            

            // FUNCTIONS
            function getAllObj(all_dates)
            {
                var all_obj = [];

                for (var i = 0; i < all_dates.length; i++)
                {
                    var date = all_dates[i];
                    var dates = [];

                    for (var j = 0; j < $scope.temp.length; j++)
                    {
                        var this_date = $scope.temp[j].dt_txt.split(" ")[0];

                        if (date == this_date)
                        {
                            dates.push($scope.temp[j]);
                        }
                        else
                        {
                            continue;
                        }
                    }

                    all_obj.push(dates);
                }

                return all_obj;
            }
            

            function getAllDates()
            {
                var dates = [];

                for (var i = 0; i < $scope.temp.length; i++)
                {
                    var this_date = $scope.temp[i].dt_txt.split(" ")[0];
                    var count = 0;

                    if (i == 0)
                    {
                        dates.push(this_date);
                    }
                    else
                    {
                        for (var j = 0; j < dates.length; j++)
                        {
                            var date = dates[j];

                            if (date == this_date)
                            {
                                break;
                            }
                            else
                            {
                                count++;
                            }
                        }

                        if (count == dates.length)
                        {
                            dates.push(this_date);
                        }
                    }
                }

                return dates;
            }
		}
	]

);