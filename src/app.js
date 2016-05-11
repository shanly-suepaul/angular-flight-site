define([
    'angular',

    './services/dataAPI',

    './passengerSelector/passengerSelector',
    './departureAirportSelector/departureAirportSelector'
], function (
    ng
) {
    'use strict';

    var app = ng.module('app', [
        'app.passengerSelector',
        'app.departureAirportSelector',
        'app.dataAPI'
    ]);

    app.controller('FlightSelectorController', [
        '$scope',
        'dataAPI',
        function(
            $scope,
            dataAPI
        ) {
            $scope.step = 1;
            $scope.passengers = {
                adults: 1,
                children: 0,
                infants: 0
            };
            $scope.departureAirport = null;

            $scope.airportList = dataAPI.getAiportData();

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
