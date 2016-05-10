define([
    'angular',

    './passengerSelector'
], function (
    ng
) {
    'use strict';

    var app = ng.module('app', [
        'app.passengerSelector'
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

            $scope.setPassengerCount = function (adults, children, infants) {
                $scope.passengers = {
                    adults: parseInt(adults),
                    children: parseInt(children),
                    infants: parseInt(infants)
                };

                $scope.step = 2;
            };
        }
    ]);

    ng.bootstrap(document, [ 'app' ]);
});
