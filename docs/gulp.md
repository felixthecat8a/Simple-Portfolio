# Gulp Build Automation

[![Gulp.js](https://img.shields.io/badge/built_with-Gulp.js-CF4647?style=for-the-badge&logo=gulp&logoColor=white)](https://gulpjs.com/)

## Overview

[Gulp](https://gulpjs.com/) is a JavaScript task runner that automates development workflows using streams and plugins.

Gulp can compile LESS, process CSS, create source maps, minify files, copy assets, and watch for changes.

## Install Dependencies

Install Gulp and the stylesheet processing tools:

```shell
yarn add --dev gulp gulp-less
yarn add --dev postcss gulp-postcss autoprefixer
yarn add --dev gulp-clean-css gulp-rename gulp-sourcemaps
```

Install the file-processing dependencies:

```shell
yarn add --dev gulp-newer gulp-htmlmin
yarn add --dev gulp-imagemin
```

## Compile LESS and CSS

Create `gulpfile.js`:

```javascript
const gulp = require('gulp')
const less = require('gulp-less')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const cleanCSS = require('gulp-clean-css')
const rename = require('gulp-rename')
const sourcemaps = require('gulp-sourcemaps')

function stylesCSS() {
  return gulp.src('src/css/**/*.css')
    .pipe(sourcemaps.init())
    .pipe(postcss([autoprefixer()]))
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/assets/styles/'))
}

function stylesLESS() {
  return gulp.src('src/less/**/*.less')
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(postcss([autoprefixer()]))
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/assets/styles/'))
}

function watchStyles() {
  gulp.watch('src/css/**/*.css', stylesCSS)
  gulp.watch('src/less/**/*.less', stylesLESS)
}

exports.dev = gulp.series(
  gulp.parallel(stylesLESS, stylesCSS),
  watchStyles
)

exports.watch = watchStyles

exports.default = gulp.parallel(
  stylesLESS,
  stylesCSS
)
```

The LESS task compiles LESS before processing the resulting CSS with PostCSS and Clean CSS.

The CSS task processes existing CSS files directly.

Both tasks append `.min` to their output filenames and generate source maps.

## Copy HTML and Other Assets

The following example adds tasks for copying HTML files, a favicon, and images.

Add these imports to `gulpfile.js`:

```javascript
const htmlmin = require('gulp-htmlmin')
const newer = require('gulp-newer')
```

Add the tasks:

```javascript
function html() {
  return gulp.src('src/html/**/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(gulp.dest('dist/'))
}

function favicon() {
  return gulp.src('src/favicon/favicon.ico')
    .pipe(gulp.dest('dist/'))
}

async function images() {
  const imagemin = (await import('gulp-imagemin')).default
  const output = 'dist/assets/images/'

  return gulp.src(
    'src/img/**/*.{png,jpg,jpeg,gif,svg}',
    { encoding: false }
  )
    .pipe(newer(output))
    .pipe(imagemin())
    .pipe(gulp.dest(output))
}

exports.copy = gulp.series(html, favicon, images)
```

The `newer` plugin skips images that are already up to date according to its comparison with the destination.

The image task dynamically imports `gulp-imagemin`, which is an ES module in current releases.

## Configure Scripts

Add the following scripts to `package.json`:

```json
{
  "scripts": {
    "dev": "gulp dev",
    "build": "gulp",
    "watch": "gulp watch",
    "copy": "gulp copy"
  }
}
```

## Run Gulp

Compile the stylesheets:

```shell
yarn build
```

Watch stylesheet files for changes:

```shell
yarn watch
```

Run the development task, which compiles the stylesheets before watching for changes:

```shell
yarn dev
```

Copy and process HTML, the favicon, and images:

```shell
yarn copy
```

## Notes

- The default Gulp task builds stylesheets only.
- The copy task is separate from the default build.
- The `dev` task watches stylesheets but does not automatically copy HTML or images.
- The examples minify stylesheets even during development.
- Add error handling if you want the watch process to continue after a compilation error.

## References

- [Gulp Documentation](https://gulpjs.com/)
- [gulp-less](https://github.com/gulp-community/gulp-less)
- [PostCSS](https://postcss.org/)
