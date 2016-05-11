define([
    'angular'
],
function (
    ng
) {
    'use strict';

    var dataAPI = ng.module('app.dataAPI', []);

    return dataAPI.service('dataAPI', [
        function (
        ) {
            var airportList = [
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

            return {
                getAiportData: function() {
                    return airportList;
                }
            };
    } ]);
});
