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
        'ngDialog': '../bower_components/ng-dialog/js/ngDialog',
        'text': '../bower_components/requirejs-text/text'
    },
    shim: {
        'angular': {
            exports: 'angular'
        }
    }
});
