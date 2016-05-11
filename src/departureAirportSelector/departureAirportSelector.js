define([
    'angular',

    'text!./departureAirportSelector.html'
], function (
    ng,

    template
) {
    'use strict';

    var module = ng.module('app.departureAirportSelector', [
    ]);

    module.directive('departureAirportSelector', [
        function() {
            return {
                restrict: 'E',
                scope: {
                    getAirportList: '&airportList',
                    updateDepartureAirportCallback: '&'
                },
                template: template,
                link: function(scope) {
                    scope.departureAirport = null;

                    scope.updateDepartureAirport = function() {
                        scope.updateDepartureAirportCallback({
                            airportId: scope.departureAirport.id
                        });
                    };
                }
            };
        }
    ])
});
