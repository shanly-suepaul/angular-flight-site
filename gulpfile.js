var gulp = require('gulp');

var es = require('event-stream');
var jshint = require('gulp-jshint');
var serve = require('gulp-serve');
var watch = require('gulp-watch');
var livereload = require('gulp-livereload');
var connectLivereload = require('connect-livereload');

gulp.task('serve', function () {
    livereload.listen({
        host: 'localhost'
    });

    es.merge(
        // hint JS changes
        watch('src/**/*.js', { base: '' })
            .pipe(jshint())
            .pipe(jshint.reporter('default')), // @todo growl or make a sound

        // simple notification for static and built assets
        watch([
            'src/**/*.{html,json}',
            'assets/**/*.{png,jpg,jpeg,gif,webp,svg}'
        ])
    ).pipe(livereload());

    // listen on multiple ports
    [ 9000, 9001 ].forEach(function (port) {
        serve({
            port: port,

            middlewares: [
                connectLivereload()
            ],

            root: [
                __dirname
            ]
        })();
    });
});
