define([
    'angular'
],
function (
    ng
) {
    'use strict';

    var dataAPI = ng.module('app.dataAPI', []);

    return dataAPI.service('dataAPI', [
        '$http',
        function (
            $http
        ) {
            return {
                getAiportData: function () {
                    return $http.get('airports.json').then(function (response) {
                        return response.data.airports.map(function (airport) {
                            return {
                                id: airport.id,
                                name: airport.name
                            };
                        });
                    }, function (error) {
                        console.log('Something went wrong!', error);
                        return [];
                    });
                },

                getDestinationsForAirport: function (airportId) {
                    // @todo change to endpoint that can use POST
                    return $http.get('destinations.json').then(function (response) {
                        return response.data.airportIds;
                    }, function(error) {
                        console.log('Something went wrong!');
                        return [];
                    });
                },

                getAvailableDates: function() {
                    // @todo change to endpoint that can use POST
                    return $http.get('availableDates.json').then(function (response) {
                        return response.data.availableDates;
                    }, function(error) {
                        console.log('Something went wrong!');
                        return [];
                    });
                }
            };
    } ]);
});
