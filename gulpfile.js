var gulp = require('gulp');

var karma = require('karma');

var fs = require('fs');
var es = require('event-stream');
var exec = require("child_process").exec;
var sass = require('gulp-sass');
var jshint = require('gulp-jshint');
var serve = require('gulp-serve');
var watch = require('gulp-watch');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var requireJS = require('gulp-requirejs');
var livereload = require('gulp-livereload');
var connectLivereload = require('connect-livereload');
var rimraf = require('rimraf');

var currentRevision = null;
var appVersion = process.env.APP_VERSION;
var targetDir = process.env.TARGET_DIR;


function getCompiledScript() {
    // wait for output and cap the result with an end-event
    var done = false;
    var result = es.through(function (file) {
        if (done) {
            throw new Error('cannot output more than one file');
        }

        done = true;

        this.emit('data', file);
        this.emit('end');
    });

    // prepare temp files for compilation and pipe compilation result into our result-stream
    var rjsTmpDir = '.tmp/rjs-dist';

    rimraf(rjsTmpDir, function () {
        requireJS({
            name: 'app',
            baseUrl: 'src',
            mainConfigFile: 'src/main.js',
            include: [ 'almond', 'main' ], // include map config
            paths: {},

            out: 'app.js'
        }).pipe(result);
    });

    return result;
}

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
                'src/main.js', // main paths file
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

gulp.task('rev', function (cb) {
    exec('git rev-parse --short HEAD', function (err, stdout) {
        currentRevision = stdout.trim();
        cb();
    });
});

gulp.task('jshint', function () {
    return gulp.src('src/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(jshint.reporter('fail'));
});

gulp.task('dist', [ 'rev', 'jshint' ], function () {
    if (!appVersion) {
        throw new Error('app version is required');
    }

    if (!targetDir) {
        throw new Error('target directory is required');
    }

    var targetDirStat = null;

    try {
        targetDirStat = fs.statSync(targetDir);
    } catch (e) {
        // ignore errors
    }

    if (targetDirStat) {
        throw new Error('target directory already exists');
    }

    return es.concat(
        getCompiledScript().pipe(rename({ suffix: '-' + currentRevision })).pipe(uglify()).pipe(rename({ suffix: '.min' }))
    )
    .pipe(gulp.dest(targetDir));
});
