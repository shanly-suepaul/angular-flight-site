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
                }
            };
    } ]);
});
