'use strict';

// Include dependencies
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

// Javascript files to concatinate
var jsImports = [
      'javascripts/partials/*.js',
      'javascripts/*.js'
    ];

var fontName = 'font-icons';

// -------------------------------------------
// Sass tasks
// Using gulp-sass
// https://www.npmjs.com/package/gulp-sass

gulp.task('sass', function () {
  return gulp
    .src('sass/**/*.scss')
    // Initiate sourcemaps
    .pipe($.sourcemaps.init())
    // Convert sass into css
    .pipe($.sass({
      // sourcemap: true,
      errLogToConsole: true,
      includePaths: ['node_modules/susy/sass']
    }))
    // Catch any SCSS errors and prevent them from crashing gulp
    .on('error', function (error) {
        console.error(error);
        this.emit('end');
    })
    // Prefix CSS3 properties for browsersupport
    // .pipe($.autoprefixer({
    //   browsers: ['last 2 versions']
    // }))
    // Write out source maps
    .pipe($.sourcemaps.write())
    // Save the CSS
    .pipe(gulp.dest('../assets/stylesheets'))
    // .pipe($.livereload());
});

gulp.task('sass-production', function () {
  return gulp
    .src('sass/**/*.scss')
    .pipe($.sass({
      outputStyle: 'compressed',
      errLogToConsole: true,
      includePaths: ['node_modules/susy/sass']
    }))
    // Catch any SCSS errors and prevent them from crashing gulp
    .on('error', function (error) {
        console.error(error);
        this.emit('end');
    })
    .pipe($.autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('../assets/stylesheets'));
});

// -------------------------------------------
// Javascript tasks
// Using gulp-uglifyjs
// https://www.npmjs.com/package/gulp-uglifyjs

gulp.task('javascripts', function() {
  return gulp
    .src(jsImports)
    .pipe($.sourcemaps.init())
    .pipe($.concat('main.js'))
    .pipe($.uglify({
      outSourceMap: true,
      output: {
        beautify: true
      }
    }))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('../assets/javascripts/'))
    // .pipe($.livereload());
});

gulp.task('javascripts-production', function() {
  return gulp
    .src(jsImports)
    .pipe($.concat('main.js'))
    .pipe($.uglify({
      compress: {
        warnings : true
      }
    }))
    .pipe(gulp.dest('../assets/javascripts/'));
});

// Create icon font
gulp.task('iconfont', function() {
  return gulp
    .src('fonticons/*.svg')
    .pipe($.iconfontCss({
      fontName: fontName,
      path: 'sass/core/_font-icons-setup.scss',
      targetPath: '../../../sources/sass/core/_font-icons.scss',
      fontPath: 'icons/'
    }))
    .pipe($.iconfont({
      fontName: fontName,
      fontHeight: 1000,
      appendCodepoints: true,
      normalize: true
    }))
    .pipe(gulp.dest('../assets/fonts/icons/'));
});

// -------------------------------------------
// Setting up common tasks

// Watch Files For Changes & Reload
gulp.task('watch', function() {
  // $.livereload.listen({
  //   port: 8000
  // });
  gulp.watch('sass/**/*.scss', ['sass'])
  gulp.watch('javascripts/**/*.js', ['javascripts'])
  gulp.watch('fonticons/*.svg', ['iconfont'])
});

// Compile for development
gulp.task('development', ['sass', 'javascripts']);

// Compile for production
gulp.task('production', ['sass-production', 'javascripts-production']);

// Default task
gulp.task('default', ['development']);
