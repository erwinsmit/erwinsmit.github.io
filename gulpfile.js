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
    ghPages = require('gulp-gh-pages');

gulp.task('styles', function () {
    return sass('src/css/main.scss', {style: 'expanded'})
        .pipe(gulp.dest('dist/assets/css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('dist/assets/css'))
        .pipe(notify({message: 'Styles task complete'}));
});

gulp.task('images', function () {
    return gulp.src('src/images/**/*')
        .pipe(imagemin({optimizationLevel: 3, progressive: true, interlaced: true}))
        .pipe(gulp.dest('dist/assets/img'))
        .pipe(notify({message: 'Image task complete'}));
});

gulp.task('scripts', function () {
    return gulp.src(['src/js/vendor/**/*.js', 'src/js/*.js', 'src/js/app/**/*.js'])
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))
        .pipe(concat('main.js'))
        .pipe(gulp.dest('dist/assets/js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('dist/assets/js'))
        .pipe(notify({message: 'Scripts task complete'}));
});

gulp.task('replace', function () {
    gulp.src(['index.html', 'projects.json'])
        .pipe(replace('dist/', ''))
        .pipe(gulp.dest('dist'));
});

gulp.task('build', function () {
    runSequence('styles', 'images', 'scripts', 'replace');
});

gulp.task('deploy', function () {
    return gulp.src(['dist/**/*', 'CNAME'])
        .pipe(ghPages());
});

gulp.task('watch', function () {
    gulp.watch('src/css/**/*.scss', ['styles']);
    gulp.watch('src/js/**/*', ['scripts']);
    gulp.watch('src/images/**/*', ['images']);
});
