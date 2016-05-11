define([
    'angular',

    './services/dataAPI',

    './passengerSelector/passengerSelector',
    './departureAirportSelector/departureAirportSelector',
    './arrivalAirportSelector/arrivalAirportSelector'
], function (
    ng
) {
    'use strict';

    var app = ng.module('app', [
        'app.dataAPI',
        'app.passengerSelector',
        'app.departureAirportSelector',
        'app.arrivalAirportSelector'
    ]);

    app.controller('FlightSelectorController', [
        '$scope',
        'dataAPI',
        function(
            $scope,
            dataAPI
        ) {
            $scope.loadingAirportData = true;
            $scope.loadingArrivalAirports = true;
            $scope.passengers = {
                adults: 1,
                children: 0,
                infants: 0
            };
            $scope.departureAirport = null;
            $scope.arrivalAirport = null;
            $scope.airportList = [];
            $scope.arrivalAirports = [];

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

                dataAPI.getDestinationsForAirport($scope.departureAirport).then(function (airportIds) {
                    $scope.arrivalAirports = airportIds;
                    $scope.loadingArrivalAirports = false;
                }, function (error) {
                    console.log('Something went wrong!');
                    $scope.arrivalAirports = [];
                    $scope.loadingArrivalAirports = false;
                });
            };

            $scope.setArrivalAirport = function(airportId) {
                $scope.arrivalAirport = airportId;
            };
        }
    ]);

    ng.bootstrap(document, [ 'app' ]);
});
