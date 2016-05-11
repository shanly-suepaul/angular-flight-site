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
            $scope.loadingAirportData = true;
            $scope.passengers = {
                adults: 1,
                children: 0,
                infants: 0
            };
            $scope.departureAirport = null;
            $scope.airportList = [];

            dataAPI.getAiportData().then(function(airportList) {
                $scope.airportList = airportList;
                $scope.loadingAirportData = false;
            }, function (error) {
                console.log('Something went wrong!', error);
                $scope.loadingAirportData = false;
            });

            $scope.setPassengerCount = function (adults, children, infants) {
                $scope.passengers = {
                    adults: parseInt(adults),
                    children: parseInt(children),
                    infants: parseInt(infants)
                };
            };

            $scope.setDepartureAirport = function (airportId) {
                $scope.departureAirport = airportId;
            };
        }
    ]);

    ng.bootstrap(document, [ 'app' ]);
});
