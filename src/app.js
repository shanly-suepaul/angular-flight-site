define([
    'angular',
    'angular-ui-router',

    // external depedencies
    'moment',
    'pikaday',

    // services
    './services/dataAPI',

    // directives
    './passengerSelector/passengerSelector',
    './departureAirportSelector/departureAirportSelector',
    './arrivalAirportSelector/arrivalAirportSelector',

    // routes
    './routes'
], function (
    ng
) {
    'use strict';

    var app = ng.module('app', [
        'ui.router',
        'app.routes',
        'app.dataAPI',
        'app.passengerSelector',
        'app.departureAirportSelector',
        'app.arrivalAirportSelector'
    ]);

    ng.bootstrap(document, [ 'app' ]);
});
