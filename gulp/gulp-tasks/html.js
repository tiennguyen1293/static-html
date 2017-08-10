var fs              = require('fs');
var cfg             = JSON.parse(fs.readFileSync('./config.json'));
var gulp            = require('gulp');
var notify          = require('gulp-notify');
var plumber         = require('gulp-plumber');
var pug             = require('gulp-pug');
var prettify        = require('gulp-prettify');
var htmlreplace     = require('gulp-html-replace');
var inject          = require('gulp-inject');
var data            = require('gulp-data');
var merge           = require('gulp-merge-json');
var path            = require('path');

var pugOptions = {
  // pretty: true
};


// Compile jade files
gulp.task('html', ['moveBower'], function(){
  gulp.src(cfg.pug.src)
    .pipe(plumber({errorHandler: notify.onError(cfg.error)}))
    // .pipe(data(function() {
    //     return JSON.parse(fs.readFileSync('../src/temp/data.json'))
    // }))
    .pipe(pug(pugOptions))
    .pipe(inject(gulp.src(cfg.scripts.build_lib + 'modernizr-custom.js', {read: false}), {starttag: '<!-- inject:head:{{ext}} -->', relative: true}))
    .pipe(inject(gulp.src([cfg.scripts.build_lib + '**/*.js', '!' + cfg.scripts.build_lib + 'modernizr-custom.js'], {read: false}), {relative: true}))
    .pipe(prettify({indent_size: 2}))
    .pipe(gulp.dest(cfg.pug.build));
});

gulp.task('html-build', ['moveBower'], function(){
  gulp.src(cfg.pug.src)
    .pipe(plumber({errorHandler: notify.onError(cfg.error)}))
    .pipe(pug(jadeOptions))
    .pipe(inject(gulp.src(cfg.scripts.build_lib + 'modernizr-custom.js', {read: false}), {starttag: '<!-- inject:head:{{ext}} -->', relative: true}))
    .pipe(inject(gulp.src([cfg.scripts.build_lib + '**/*.js', '!' + cfg.scripts.build_lib + 'modernizr-custom.js'], {read: false}), {relative: true}))
    .pipe(htmlreplace({
      js: 'assets/js/script.min.js',
      css: 'assets/styles/style.min.css'
    }))
    .pipe(prettify({indent_size: 2}))
    .pipe(gulp.dest(cfg.pug.build));
});
