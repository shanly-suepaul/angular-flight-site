(function() {
    var app = angular.module('flightSelector', []);

    app.controller('FlightSelectorController', [
        '$scope',
        function(
            $scope
        ) {
            $scope.step = 1;
            $scope.passengers = {
                adults: 1,
                children: 0,
                infants: 0
            };

            $scope.submitPassengerCount = function () {
                if ((parseInt($scope.passengers.adults) + parseInt($scope.passengers.children) + parseInt($scope.passengers.infants)) <= 0) {
                    alert('You must send at least one person!');
                    return;
                }

                $scope.step = 2;
            };
        }
    ]);

})();