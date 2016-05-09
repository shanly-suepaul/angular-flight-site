(function() {
    'use strict';

    var module = angular.module('flightSelector.passengerSelector', []);

    module.directive('passengerSelector', [
        function() {
            return {
                restrict: 'E',
                scope: {
                    adultPassengers: '@',
                    childPassengers: '@',
                    infantPassengers: '@',
                    updatePassengerCountCallback: '&'
                },
                templateUrl: 'passengerSelector.html',
                link: function(scope) {

                    scope.updatePassengerCount = function() {
                        if ((parseInt(scope.adultPassengers) + parseInt(scope.childPassengers) + parseInt(scope.infantPassengers)) <= 0) {
                            alert('You must send at least one person!');
                            return;
                        }

                        scope.updatePassengerCountCallback({
                            adults: scope.adultPassengers,
                            children: scope.childPassengers,
                            infants: scope.infantPassengers
                        });
                    };
                }
            };
        }
    ])
})();