define([
    'angular',

    './passengerSelector',
    './departureAirportSelector'
], function (
    ng
) {
    'use strict';

    var app = ng.module('app', [
        'app.passengerSelector',
        'app.departureAirportSelector'
    ]);

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
            $scope.departureAirport = null;

            $scope.airportList = [
                {
                    id: 'LHR',
                    name: 'London Heathrow'
                },
                {
                    id: 'LGW',
                    name: 'London Gatwick'
                },
                {
                    id: 'BRS',
                    name: 'Bristol'
                },
                {
                    id: 'GLA',
                    name: 'Glasgow'
                },
                {
                    id: 'EDI',
                    name: 'Edinborough'
                },
                {
                    id: 'MAN',
                    name: 'Manchester'
                }
            ];

            $scope.setPassengerCount = function (adults, children, infants) {
                $scope.passengers = {
                    adults: parseInt(adults),
                    children: parseInt(children),
                    infants: parseInt(infants)
                };

                $scope.step = 2;
            };

            $scope.setDepartureAirport = function (airportId) {
                $scope.departureAirport = airportId;
            };
        }
    ]);

    ng.bootstrap(document, [ 'app' ]);
});
