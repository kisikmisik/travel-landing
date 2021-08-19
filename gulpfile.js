'use strict';

const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sourcemap = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const del = require('del');

const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const server = require('browser-sync').create();
const csso = require('gulp-csso');
const svgstore = require('gulp-svgstore');
const posthtml = require('gulp-posthtml');
const include = require('posthtml-include');
const htmlmin = require('gulp-htmlmin');
const uglify = require('gulp-uglify-es').default;

const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');

gulp.task('to-clean-build', function () {
  return del('build');
});

gulp.task('copy-src-to-build', function () {
  return gulp.src([
    'source/fonts/**/*.{woff,woff2}',
    'source/img/**',
    'source/*.ico'
  ], {
    base: 'source'
  })
    .pipe(gulp.dest('build'));
});

gulp.task('images', function () {
  return gulp.src('source/img/**/*.{png,jpg,svg}')
    .pipe(imagemin([
      imagemin.optipng({ optimizationLevel: 3 }),
      imagemin.mozjpeg({ progressive: true }),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest('source/img'));
});

gulp.task('transfer-to-webp', function () {
  return gulp.src('source/img/**/*{jpg,png}')
    .pipe(webp({ quality: 90 }))
    .pipe(gulp.dest('source/img'));
});

gulp.task('sprite', function () {
  return gulp.src('source/img/icon-*.svg')
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('build/img'));
});

gulp.task('copy-html-to-build', function () {
  return gulp.src('source/*.html')
    .pipe(posthtml([
      include()
    ]))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('build'));
});

gulp.task('copy-css-to-build', function () {
  return gulp.src('source/scss/style.scss')
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename('style.min.css'))
    .pipe(sourcemap.write('.'))
    .pipe(gulp.dest('build/css'))
    .pipe(server.stream());
});

gulp.task('uglify-js', function () {
  return gulp.src('source/**/*.js')
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('build'));
});

gulp.task('refresh', function (done) {
  server.reload();
  done();
});

gulp.task('server', function () {
  server.init({
    server: 'build/',
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch('source/scss/**/*.{scss,sass}', gulp.series('copy-css-to-build'));
  gulp.watch('source/img/icon-*.svg', gulp.series('sprite', 'copy-html-to-build', 'refresh'));
  gulp.watch('source/*.html', gulp.series('copy-html-to-build', 'refresh'));
  gulp.watch('source/js/*.js', gulp.series('uglify-js', 'refresh'));
});

gulp.task('build', gulp.series(
  'to-clean-build',
  'copy-src-to-build',
  'copy-css-to-build',
  'sprite',
  'copy-html-to-build',
  'uglify-js'
));

gulp.task('start', gulp.series('build', 'server'));
