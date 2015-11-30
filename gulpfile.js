var gulp = require('gulp'),
  sass = require('gulp-ruby-sass'),
  minifycss = require('gulp-minify-css'),
  jshint = require('gulp-jshint'),
  uglify = require('gulp-uglify'),
  imagemin = require('gulp-imagemin'),
  runSequence = require('run-sequence'),
  replace = require('gulp-replace'),
  rename = require('gulp-rename'),
  concat = require('gulp-concat'),
  notify = require('gulp-notify'),
  cache = require('gulp-cache'),
  livereload = require('gulp-livereload'),
  del = require('del'),
  ghPages = require('gulp-gh-pages')
  babel = require('gulp-babel'),
  sourcemaps = require('gulp-sourcemaps'),
  source = require('vinyl-source-stream'),
  buffer = require('vinyl-buffer'),
  browserify = require('browserify'),
  to5ify = require('6to5ify'),
  gutil = require('gulp-util'),
  clean = require('gulp-clean');

gulp.task('styles', function() {
  return sass('src/css/main.scss', {
      style: 'expanded'
    })
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(notify({
      message: 'Styles task complete'
    }));
});

gulp.task('images', function() {
  return gulp.src('src/images/**/*')
    .pipe(imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest('dist/assets/img'))
    .pipe(notify({
      message: 'Image task complete'
    }));
});

gulp.task('lib-scripts', function() {
  return gulp.src(['src/js/vendor/**/*.js'])
    .pipe(concat('lib-scripts.js'))
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(notify({
      message: 'Lib Scripts task complete'
    }));
});

gulp.task('lintjs', function() {
  return gulp.src(['src/js/app/*.js', 'src/js/*.js'])
  .pipe(jshint('.jshintrc'))
  .pipe(jshint.reporter('default'))
});

gulp.task('scripts', function() {
  return browserify('src/js/portfolio.js', {
      debug: true
    })
    .transform(to5ify)
    .bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('scripts.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({
      loadMaps: true
    })) // loads map from browserify file
    .pipe(uglify())
    .pipe(sourcemaps.write('./')) // writes .map file
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(notify({
      message: 'ES6 Scripts task complete'
    }));
});

gulp.task('clean-scripts', function() {
  return gulp.src('dist/assets/js/*.js', {
      read: false
    })
    .pipe(clean())
    .pipe(notify({
      message: 'Clean scripts task complete'
    }));
});

gulp.task('concat-scripts', ['clean-scripts', 'scripts', 'lib-scripts'], function() {
  return gulp.src(['dist/assets/js/*.js'])
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(notify({
      message: 'Build scripts task complete'
    }));
});

gulp.task('replace', function() {
  gulp.src(['index.html', 'projects.json'])
    .pipe(replace('dist/', ''))
    .pipe(gulp.dest('dist'));
});

gulp.task('build', function() {
  runSequence('styles', 'images', 'concat-scripts', 'replace');
});

gulp.task('deploy', function() {
  return gulp.src(['dist/**/*', 'CNAME', 'favicon.ico'])
    .pipe(ghPages());
});

gulp.task('watch', function() {
  gulp.watch('src/css/**/*.scss', ['styles']);
  gulp.watch('src/js/**/*', ['concat-scripts']);
  gulp.watch('src/images/**/*', ['images']);
});
