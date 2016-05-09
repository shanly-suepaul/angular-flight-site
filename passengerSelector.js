(function() {
    'use strict';

    var module = angular.module('flightSelector.passengerSelector', [
        'ngDialog'
    ]);

    module.directive('passengerSelector', [
        'ngDialog',
        function(ngDialog) {
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
                            ngDialog.open({
                                plain: true,
                                template: '<h1>You need at least one person</h1>'
                            });
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