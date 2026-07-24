<!-- LESS Stylesheet -->
# LESS Stylesheet

[![Less](https://img.shields.io/badge/styled_with-Less-1d365d?style=for-the-badge&logo=less&logoSize=auto&logoColor=white)](https://lesscss.org/)
![CSS]( https://img.shields.io/badge/CSS-663399?style=for-the-badge&logo=css&logoSize=auto&logoColor=white)
![HTML](https://img.shields.io/badge/HTML-E34F26?style=for-the-badge&logo=html5&logoSize=auto&logoColor=white)

## [LESS](https://lesscss.org/)

***LESS*** is a dynamic stylesheet language that extends CSS with variables, nested rules, mixins, operations, and functions. 
This makes stylesheets modular, reusable, and maintainable.
`less-plugin-clean-css` minifies the output using [`clean-css`](https://github.com/jakubpawlowicz/clean-css).

### Install Dependencies

```ps
yarn add --dev less less-plugin-clean-css
```

### Script: `package.json`

```json
{
  "scripts": {
    "less": "lessc src/less/style.less dist/css/style.min.css --clean-css"
  }
}
```

### Usage

```ps
yarn less
```

---

# [Gulp.js](https://gulpjs.com/)

[![Gulp.js](https://img.shields.io/badge/built_with-Gulp.js-CF4647?style=for-the-badge&logo=gulp&logoSize=auto&logoColor=#CF4647)](https://gulpjs.com/)

## Compiling LESS Files Using [Gulp.js](https://gulpjs.com/)

***Gulp.js*** is an open-source JavaScript toolkit, used as a streaming build system (similar to a more package-focused Make) in front-end web development.
Using Gulp gives more control than the Less CLI and allows adding sourcemaps, autoprefixing, and minification in a single pipeline. *PostCSS* transforms CSS using JavaScript plugins like Autoprefixer.

### Install Dependencies

```ps
yarn add --dev gulp gulp-less
yarn add --dev postcss gulp-postcss autoprefixer
yarn add --dev gulp-clean-css gulp-rename gulp-sourcemaps
```

### Setup: `gulpfile.js`

```js
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
  return gulp.src('src/less/style.less')
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

exports.dev = gulp.series(gulp.parallel(stylesLESS, stylesCSS), watchStyles)
exports.watch = watchStyles
exports.build = gulp.parallel(stylesLESS, stylesCSS)
exports.default = gulp.parallel(stylesLESS, stylesCSS)
```

### Script: `package.json`

```json
{
  "scripts": {
    "dev": "gulp dev",
    "build": "gulp build",
    "watch": "gulp watch"
  }
}
```
---

## Using [Gulp.js](https://gulpjs.com/) to Copy Files

### Install Dependencies

```shell
yarn add --dev gulp-htmlmin gulp-newer gulp-imagemin
```

### Setup: `gulpfile.js`

```js
const gulp = require('gulp')
const htmlmin = require('gulp-htmlmin')
const newer = require('gulp-newer')

function html() {
  return gulp.src('src/html/**/*.html')
    .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
    .pipe(gulp.dest('dist/'))
}

function favicon() {
  return gulp.src('src/favicon/favicon.ico')
    .pipe(gulp.dest('dist/'))
}

async function images() {
  const imagemin = (await import('gulp-imagemin')).default
  const output = 'dist/assets/images/'
  return gulp.src('src/img/**/*.{png,jpg,jpeg,gif,svg}', { encoding: false })
    .pipe(newer(output))
    .pipe(imagemin())
    .pipe(gulp.dest(output))
}

exports.copy = gulp.series(html, favicon, images)
```

### Script: `package.json`

```json
{
  "scripts": {
    "copy": "gulp copy"
  }
}
```
---

## Developing a LESS Project Using [Webpack](https://webpack.js.org/)

[![Webpack](https://img.shields.io/badge/developed_with-Webpack-8DD6F9?logo=webpack&logoColor=8DD6F9&style=for-the-badge)](https://webpack.js.org/)
![PostCSS](https://img.shields.io/badge/PostCSS-DD3A0A?style=for-the-badge&logo=postcss&logoSize=auto&logoColor=white)

***Webpack*** is a module bundler. Webpack bundles JavaScript for the browser and can also transform and bundle assets like LESS, CSS, and images.

### Install Dependencies

```ps
yarn add --dev webpack webpack-cli webpack-dev-server
yarn add --dev style-loader css-loader less less-loader
yarn add --dev html-webpack-plugin
yarn add --dev mini-css-extract-plugin css-minimizer-webpack-plugin
```

### Configuration: `webpack.config.js`

```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  entry: {
    index: path.resolve(__dirname, 'src/js/index.js'),
    script: path.resolve(__dirname, 'src/js/script.js'),
  },

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "script/[name].bundle.js",
    clean: true
  },

  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Home',
      filename: 'index.html',
      template: 'src/html/index.html',
      favicon: 'src/favicon/favicon.ico',
      chunks: ['index'],
      minify: isProduction
    }),
    new HtmlWebpackPlugin({
      title: 'Page',
      filename: 'page.html',
      template: 'src/html/page.html',
      favicon: 'src/favicon/favicon.ico',
      chunks: ['script'],
      minify: isProduction
    }),
    ...(isProduction
      ? [new MiniCssExtractPlugin({ filename: 'style/[name].css' })]
      : [])
  ],

  optimization: {
    minimizer: [`...`, new CssMinimizerPlugin()],
    minimize: isProduction,
  },

  devtool: isProduction ? false : 'inline-source-map',

  devServer: {
    static: path.resolve(__dirname, 'dist'),
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true
  },

  mode: isProduction ? 'production' : 'development'
}
```

Import the LESS file into your JavaScript entry so Webpack can bundle it:

```js
import '../less/style.less'
```

### Script: `package.json`

```json
{
  "scripts": {
    "dev": "webpack serve --mode development",
    "build": "webpack --mode production"
  }
}
```

---

## Add **PostCSS** and **Autoprefixer** to the Project

***PostCSS*** lets you transform CSS with plugins, and ***Autoprefixer*** automatically adds vendor prefixes (like -webkit-, -ms-) based on browser support.

### Install Dependencies

```ps
yarn add --dev postcss postcss-loader autoprefixer
```

- Create a `postcss.config.js`

```js
module.exports = {
  plugins: [
    require('autoprefixer')
  ]
}
```

> Recommended: Configure browser support to tell Autoprefixer what browsers to support.

### Update: `package.json`:
```json
{
  "browserslist": [
    "defaults",
    "not dead",
    "not op_mini all"
  ]
}
```

### Update: `webpack.config.js`

```js
  {
    test: /\.less$/,
    use: [
      isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
      'css-loader',
      'postcss-loader',
      'less-loader'
    ]
  },
  {
    test: /\.css$/,
    use: [
      isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
      'css-loader',
      'postcss-loader'
    ]
  },
```

---

<!-- ESBuild Module Bundler -->
# ESBuild Module Bundler

![JavaScript](https://img.shields.io/badge/JavaScript-333?style=for-the-badge&logo=javascript&logoSize=auto&logoColor=F7DF1E)
[![esbuild]( https://img.shields.io/badge/esbuild-333?style=for-the-badge&logo=esbuild&logoSize=auto&logoColor=#FFCF00)](https://esbuild.github.io/)
![Gulp.js](https://img.shields.io/badge/Gulp-333?style=for-the-badge&logo=gulp&logoSize=auto&logoColor=#CF4647)

### ESBuild

[***esbuild***](https://esbuild.github.io/) is an extremely fast JavaScript bundler and minifier written in Go.

- Install the *esbuild* package.

```ps
yarn add --dev --exact esbuild
```

### `package.json`

```json
{
  "scripts": {
    "build": "esbuild src/js/main.js --bundle --minify --target=es6 --outfile=dist/js/main.min.js"
  }
}
```

---

## Using [Gulp.js](https://gulpjs.com/) to Bundle Scripts

- Install Gulp and the following plugins as development dependencies.

```shell
yarn add --dev gulp
```

### `gulpfile.js`

```js
const gulp = require('gulp')
const esbuild = require('esbuild')

function scripts() {
  return esbuild.build({
    entryPoints: ['src/js/main.js'],
    bundle: true,
    outfile: 'dist/assets/scripts/main.min.js',
    sourcemap: true,
    minify: true,
    target: 'es2018',
  })
}

function watch() {
  gulp.watch('src/js/**/*.js', scripts)
}

exports.dev = gulp.series(scripts, watch)
exports.watch = watch
exports.build = scripts
exports.default = scripts
```

### `package.json`

```json
{
  "scripts": {
    "dev": "gulp dev",
    "build": "gulp",
    "watch": "gulp watch"
  }
}
```
---

# Complete `gulpfile.js`
```js
const gulp = require('gulp')
const less = require('gulp-less')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const cleanCSS = require('gulp-clean-css')
const rename = require('gulp-rename')
const sourcemaps = require('gulp-sourcemaps')
const esbuild = require('esbuild')
const htmlmin = require('gulp-htmlmin')
const newer = require('gulp-newer')

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

async function images() {
  const imagemin = (await import('gulp-imagemin')).default
  const output = 'dist/assets/images/'
  return gulp.src('src/img/**/*.{png,jpg,jpeg,gif,svg}', { encoding: false })
    .pipe(newer(output))
    .pipe(imagemin())
    .pipe(gulp.dest(output))
}

function watchFiles() {
  gulp.watch('src/less/**/*.less', buildStyles)
  gulp.watch('src/js/**/*.js', buildScripts)
  gulp.watch('src/html/**/*.html', html)
}

exports.dev = gulp.series(gulp.parallel(buildStyles, buildScripts), watchFiles)
exports.watch = watchFiles
exports.build = gulp.parallel(buildStyles, buildScripts)
exports.copy = gulp.series(html, favicon, images)
exports.default = gulp.parallel(buildStyles, buildScripts, html, favicon, images)
```

## Script: `package.json`

```json
{
  "scripts": {
    "dev": "gulp dev",
    "build": "gulp build",
    "watch": "gulp watch",
    "copy": "gulp copy"
  }
}
```