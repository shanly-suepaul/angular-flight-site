define([
    'angular',

    // external depedencies
    'moment',
    'pikaday',

    // services
    './services/dataAPI',

    // directives
    './passengerSelector/passengerSelector',
    './departureAirportSelector/departureAirportSelector',
    './arrivalAirportSelector/arrivalAirportSelector'
], function (
    ng,

    moment,
    Pikaday
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
        '$element',
        'dataAPI',
        function(
            $scope,
            $element,
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
            $scope.departureDate = moment().format('D MMM YYYY').toString();
            $scope.availableDates = [];

            dataAPI.getAvailableDates().then(function (availableDates) {
                $scope.availableDates = availableDates;
            }, function (error) {
                console.log('Whoops!');
                $scope.availableDates = [];
            });


            new Pikaday({
                field: document.getElementById('departure'),
                disableDayFn: function( date ) {
                    // check if we have availableDates
                    // get the date formatted correctly
                    var dateFormatted = moment(new Date(date)).format('L').toString();

                    // Disable all days that are not in the availableDates array
                    if ($scope.availableDates.indexOf(dateFormatted) === -1) {
                        return true;
                    }
                },
                onSelect: function() {
                    console.log($scope.departureDate);
                }
            });

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
