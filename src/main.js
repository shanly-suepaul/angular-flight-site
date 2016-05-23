/**
 * RequireJS paths and shim configuration.
 * Declarative-only: does not invoke any actual code.
 * @todo rename this to config.js or something
 */
requirejs.config({
    baseUrl: 'src',
    paths: {
        'almond': '../bower_components/almond/almond',
        'angular': '../bower_components/angular/angular',
        'angular-ui-router': '../bower_components/angular-ui-router/release/angular-ui-router',
        'ngDialog': '../bower_components/ng-dialog/js/ngDialog',
        'text': '../bower_components/requirejs-text/text',
        'pikaday': '../bower_components/pikaday/pikaday',
        'moment': '../bower_components/moment/moment'
    },
    shim: {
        'angular': {
            exports: 'angular'
        },
        'angular-ui-router': {
            exports: 'angular', // @todo remove
            deps: [ 'angular' ]
        }
    }
});
