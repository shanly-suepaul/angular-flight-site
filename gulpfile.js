var gulp = require('gulp');

var karma = require('karma');

var es = require('event-stream');
var sass = require('gulp-sass');
var jshint = require('gulp-jshint');
var serve = require('gulp-serve');
var watch = require('gulp-watch');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var livereload = require('gulp-livereload');
var connectLivereload = require('connect-livereload');
var rimraf = require('rimraf');

function getCompiledStylesheetAsset(ignoreErrors) {
    return gulp.src('src/**/*.scss')
        .pipe(sass().on('error', function () {}))
        .pipe(concat('app.css'));
}

gulp.task('serve', function () {
    var previewTmpDir = '.tmp/dev-preview';

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
        ]),

        // rebuild entire compiled stylesheet
        watch('src/**/*.scss').pipe(es.map(function (e, cb) {
            getCompiledStylesheetAsset(true) // ignore errors
                .pipe(rename({ dirname: 'assets' }))
                .pipe(gulp.dest(previewTmpDir))
                .on('data', cb.bind(null, null));
        }))
    ).pipe(livereload());

    rimraf(previewTmpDir, function () {
        var tempFiles = es.concat(
            getCompiledStylesheetAsset()
        ).pipe(rename(function (path) {
            path.dirname = 'assets/' + path.dirname;
        })).pipe(gulp.dest(previewTmpDir));

        tempFiles.on('end', function () {
            // listen on multiple ports
            [9000, 9001].forEach(function (port) {
                serve({
                    port: port,

                    middlewares: [
                        connectLivereload()
                    ],

                    root: [
                        __dirname + '/' + previewTmpDir,
                        __dirname
                    ]
                })();
            });
        });
    });
});

gulp.task('test', function (cb) {
    var karmaTmpDir = '.tmp/karma-test';

    rimraf(karmaTmpDir, function () {
        karma.server.start({
            files: [
                'main.js', // main paths file
                'test/main.js',

                { pattern: 'src/**/*.{js,json,html}', included: false },
                { pattern: 'bower_components/**/*.js', included: false },
                { pattern: 'test/**/*Test.js', included: false }
            ],

            frameworks: [ 'requirejs', 'mocha', 'sinon-chai' ],

            preprocessors: {
                'src/**/*.js': [ 'coverage' ]
            },

            reporters: [ 'dots', 'coverage' ],
            coverageReporter: {
                type: 'text'
            },

            logLevel: 'INFO',

            browsers: [ 'PhantomJS' ],
            captureTimeout: 5000,

            singleRun: true
        });

        cb();
    });
});
