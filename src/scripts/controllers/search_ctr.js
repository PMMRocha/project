myApp.controller(

	'SearchController',

	[
		'$scope',
        '$rootScope',
		'$http',
        '$location',

		function ( $scope, $rootScope, $http, $location )
		{
            // get data from json file
            $http.get('../js/json/city.list.json')
                .then( function (response)
                {
                    $rootScope.cities = response.data;
                }
            );
            

            $scope.searchToggle = function ( obj )
            {
                var container = $(obj).closest('.search-wrapper');

                if(!container.hasClass('active'))
                {
                    container.addClass('active');
                    container.append("<p id='msg'>Type a city's name e.g. Porto");
                    container.find('#msg').fadeIn('slow');
                }
                else if(container.hasClass('active') && $(obj).closest('.input-holder').length == 0)
                {
                    container.removeClass('active');
                    // clear input
                    container.find('.search-input').val('');
                    container.find('#msg').remove();
                    
                    
                }
            }


            $scope.submitFn = function ( obj )
            {
                var value = $(obj).find('.search-input').val().trim();

                if(!value.length)
                {
                    return;
                }
                else
                {
                    $rootScope.search = $scope.query;
                    
                    if ($scope.query.length < 3)
                    {
                        $('#msg').html('Min 3 letters');
                    }
                    else
                    {
                        $location.path('/results/' + $scope.query);
                    }
                }
            }
		}
	]

);