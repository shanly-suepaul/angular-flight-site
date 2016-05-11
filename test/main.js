/**
 * Karma test entry-point
 */

requirejs.config({
    // Karma serves files from '/base'
    baseUrl: '/base/src',

    paths: {
        'angular-mocks': '../bower_components/angular-mocks/angular-mocks'
    },

    shim: {
        'angular-mocks': {
            exports: 'angular.mock',
            deps: [ 'angular' ]
        }
    }
});

// load tests and start Karma run
var tests = Object.keys(window.__karma__.files).filter(function (v) {
    return /^\/base\/test\/.*Test\.js$/.test(v);
});

require(tests, function () { window.__karma__.start(); });
