'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const debug = require('gulp-debug');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const gulpIf = require('gulp-if');
const del = require('del');
const newer = require('gulp-newer');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const notify = require('gulp-notify');
const multipipe = require('multipipe');
// const eslint = require('gulp-eslint');
const merge = require('merge-stream');

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

sass.compiler = require('node-sass');

gulp.task('styles', function () {
    return multipipe(
        gulp.src('frontend/css/style.scss'),
        gulpIf(isDevelopment, sourcemaps.init()),
        sass().on('error', sass.logError),
        autoprefixer(),
        // concat('style.main.css'),
        gulpIf(isDevelopment, sourcemaps.write()),
        gulp.dest('public/css')
    ).on('error', notify.onError())
});

gulp.task('clean', function () {
    return del('public');
});

gulp.task('assets', function () {
    return gulp.src('frontend/assets/**', {since: gulp.lastRun('assets')})
        .pipe(newer('public'))
        .pipe(debug({title: 'assets'}))
        .pipe(gulp.dest('public'));
});

gulp.task('libs', function () {
    var libscss = gulp.src('frontend/css/**.css')
        .pipe(gulp.dest('public/css'));

    var libsjs = gulp.src('frontend/js/libs/**')
        .pipe(gulp.dest('public/js/libs'));

    return merge(libscss, libsjs);
});

gulp.task('js', function () {
    return gulp.src('frontend/js/src/**')
        .pipe(concat('script.main.js'))
        // .pipe(eslint())
        // .pipe(eslint.format())
        // .pipe(eslint.failAfterError())
        .pipe(gulp.dest('public/js'));
});

gulp.task ('build', gulp.series(
    'clean',
    gulp.parallel('styles', 'assets', 'js', 'libs'))
);

gulp.task('watch', function () {
    gulp.watch('frontend/css/**/*.*', gulp.series('styles'));
    gulp.watch('frontend/js/**/*.*', gulp.series('js'));
    gulp.watch('frontend/assets/**/*.*', gulp.series('assets'));
});

gulp.task ('serve', function () {
    browserSync.init({
        server: 'public'
    });
    browserSync.watch('public/**/*.*').on('change', browserSync.reload);
});

gulp.task ('dev',
    gulp.series('build', gulp.parallel('watch', 'serve'))
);
