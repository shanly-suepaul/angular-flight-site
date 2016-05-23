define([
    'angular',

    'text!./index.html',
    './flight',
    'text!./flight.html',
    './passengers',
    'text!./passengers.html'
], function (
    ng,

    indexTemplate,

    flightController,
    flightTemplate,

    passengerController,
    passengerTemplate
) {
    'use strict';

    ng.module('app.routes', []).config([
        '$stateProvider',
        '$urlRouterProvider',
        function (
            $stateProvider,
            $urlRouterProvider
        ) {
            // default redirect
            $urlRouterProvider.otherwise('/');

            $stateProvider.state('index', {
                abstract: true,
                url: '/',
                template: indexTemplate
            })
            .state('index.flight', {
                url: '',
                template: flightTemplate,
                controller: flightController
            })
            .state('index.passengers', {
                url: 'planFoobar',
                template: passengerTemplate,
                controller: passengerController
            });
    } ]);
});
