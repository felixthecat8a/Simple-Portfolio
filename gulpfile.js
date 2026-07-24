const gulp = require('gulp')
const less = require('gulp-less')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const cleanCSS = require('gulp-clean-css')
const rename = require('gulp-rename')
const sourcemaps = require('gulp-sourcemaps')
const esbuild = require('esbuild')
const htmlmin = require('gulp-htmlmin')

function buildStyles() {
  return gulp.src('src/less/style.less')
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(postcss([autoprefixer()]))
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/assets/styles/'))
}

function buildScripts() {
  return esbuild.build({
    entryPoints: ['src/js/main.js'],
    bundle: true,
    outfile: 'dist/assets/scripts/main.min.js',
    sourcemap: true,
    minify: true,
    target: 'es2018',
  })
}

function html() {
  return gulp.src('src/html/**/*.html')
    .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
    .pipe(gulp.dest('dist/'))
}

function favicon() {
  return gulp.src('src/favicon/favicon.ico')
    .pipe(gulp.dest('dist/'))
}

function watchFiles() {
  gulp.watch('src/less/**/*.less', buildStyles)
  gulp.watch('src/js/**/*.js', buildScripts)
  gulp.watch('src/html/**/*.html', html)
}

exports.dev = gulp.series(gulp.parallel(buildStyles, buildScripts), watchFiles)
exports.watch = watchFiles
exports.build = gulp.parallel(buildStyles, buildScripts)
exports.copy = gulp.series(html, favicon)
exports.default = gulp.parallel(buildStyles, buildScripts, html, favicon)