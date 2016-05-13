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
                    defaultAirportId: '=',
                    getAirportList: '&airportList',
                    updateDepartureAirportCallback: '&'
                },
                template: template,
                link: function(scope) {
                    scope.$watch('defaultAirportId', function() {
                        console.log(scope.defaultAirportId);
                        scope.departureAirport = {id: scope.defaultAirportId, name:''};
                    });

                    scope.departureAirport = null;

                    scope.updateDepartureAirport = function() {
                        scope.updateDepartureAirportCallback({
                            airportId: scope.departureAirport.id
                        });
                    };
                }
            };
        }
    ]);
});
