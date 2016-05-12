define([
    'angular',

    'text!./arrivalAirportSelector.html'
], function (
    ng,

    template
) {
    'use strict';

    var module = ng.module('app.arrivalAirportSelector', [
    ]);

    module.directive('arrivalAirportSelector', [
        function() {
            return {
                restrict: 'E',
                scope: {
                    getAirportList: '&airportList',
                    getValidArrivalAirportIds: '&validAirportIds',
                    updateArrivalAirportCallback: '&'
                },
                template: template,
                link: function(scope) {
                    var sortAirports = function (a, b) {
                        if (a.name.localeCompare(b.name) < 0) {
                            return -1;
                        }
                        if (a.name.localeCompare(b.name) > 0) {
                            return 1;
                        }
                        return 0;
                    };


                    scope.validAirportList = scope.getAirportList()
                        .filter(function(airport) {
                            return scope.getValidArrivalAirportIds().indexOf(airport.id) > -1;
                        })
                        .sort(sortAirports);

                    scope.invalidAirportList = scope.getAirportList()
                        .filter(function(airport) {
                            return scope.getValidArrivalAirportIds().indexOf(airport.id) === -1;
                        })
                        .sort(sortAirports);

                    scope.updateArrivalAirport = function(airportId) {
                        scope.updateArrivalAirportCallback({
                            airportId: airportId
                        });
                    };
                }
            };
        }
    ]);
});
