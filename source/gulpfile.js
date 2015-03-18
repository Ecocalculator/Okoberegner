var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    connect = require('gulp-connect'),
    livereload = require('gulp-livereload');

// Sass Task 
gulp.task('sass', function() {
  gulp.src('./scss/{,*/}*.{scss,sass}')
    .pipe(sourcemaps.init())
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('../app/stylesheets'))
    //.pipe(connect.reload());
});

// Server
// gulp.task('connect', function() {
//   connect.server({
//     port: 8000,
//     root: '../',
//     livereload: true
//   });
// });

// HTML
gulp.task('html', function () {
  gulp.src('./app/*.html')
    //.pipe(connect.reload());
});

// Javascript task
gulp.task('scripts', function() {
  gulp.src(['javascripts/*.js', 'javascripts/partials/*.js'])
    .pipe(concat('main-min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('../app/javascripts'))
    //.pipe(connect.reload());
});


gulp.task('watch', function() {
  gulp.watch('./scss/{,*/}*.{scss,sass}', ['sass'])
  gulp.watch('javascripts/*.js', ['scripts'])
  gulp.watch('javascripts/partials/*.js', ['scripts'])
  gulp.watch(['../*.html'], ['html'])
});

gulp.task('default', ['sass', 'scripts', 'watch']);
