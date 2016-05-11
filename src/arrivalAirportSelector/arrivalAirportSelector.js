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
                    var validArrivalAirportIds = scope.getValidArrivalAirportIds();
                    console.log(validArrivalAirportIds);

                    scope.arrivalAirport = null;
                    scope.airportList = scope.getAirportList().map(function(airport) {
                        return {
                            id: airport.id,
                            name: airport.name,
                            available: validArrivalAirportIds.indexOf(airport.id) > -1
                        }
                    });
                    console.log(scope.airportList);

                    scope.updateArrivalAirport = function() {
                        scope.updateArrivalAirportCallback({
                            airportId: scope.arrivalAirport.id
                        });
                    };
                }
            };
        }
    ])
});
