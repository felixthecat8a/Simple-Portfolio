# Using Less.js and Webpack
<!-- Less Stylesheet -->
## Compiling Less Files to CSS Stylesheets 
[![Less](https://img.shields.io/badge/styled_with-Less-1d365d?style=for-the-badge&logo=less&logoSize=auto&logoColor=white)](https://lesscss.org/)
![CSS]( https://img.shields.io/badge/CSS-663399?style=for-the-badge&logo=css&logoSize=auto&logoColor=white)
![HTML](https://img.shields.io/badge/HTML-E34F26?style=for-the-badge&logo=html5&logoSize=auto&logoColor=white)
<!-- Less Description -->
[***Less***](https://lesscss.org/) (*Leaner Style Sheets*) is a backward-compatible language extension and preprocessor for ***CSS*** (*Cascading Style Sheets*). 
It extends CSS with variables, nested rules, mixins, operations, and functions. 
This makes stylesheets modular, reusable, and maintainable.
`less-plugin-clean-css` minifies the output using [`clean-css`](https://github.com/jakubpawlowicz/clean-css).
<!-- Install Dependencies -->
### Install Dependencies
```ps
yarn add --dev less less-plugin-clean-css
```
### Add Script to `package.json`
<!-- package.json -->
```json
{
  "scripts": {
    "less": "lessc src/less/style.less dist/css/style.min.css --clean-css --source-map"
  }
}
```
### Compile
Create a **dist** folder ind the root directory and run the command `yarn less` in the terminal.
```ps
yarn less
```
---

## Compiling Less Files using [Webpack](https://webpack.js.org/)

[![Webpack](https://img.shields.io/badge/developed_with-Webpack-8DD6F9?logo=webpack&logoColor=8DD6F9&style=for-the-badge)](https://webpack.js.org/)

***Webpack*** is a module bundler. Webpack bundles JavaScript for the browser and can also transform and bundle assets like LESS, CSS, and images.

### Install Dependencies

#### Webpack
```ps
yarn add --dev webpack webpack-cli webpack-dev-server
```
#### Style Loaders
```ps
yarn add --dev style-loader css-loader less less-loader
```
#### HTML Plugins
```ps
yarn add --dev html-webpack-plugin
```
#### CSS Plugins
```ps
yarn add --dev mini-css-extract-plugin css-minimizer-webpack-plugin
```
#### Configuration: `webpack.config.js`
```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

module.exports = (env, argv) => {
  const isProd = argv.mode === 'production'

  return {
    mode: isProd ? 'production' : 'development',
    entry: {
      docs: path.resolve(__dirname, 'src/js/mainDocs.js'),
      port: path.resolve(__dirname, 'src/js/mainPort.js'),
    },
    output: {
      filename: isProd ? '[name].[contenthash].js' : '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [
            isProd ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
          ],
        },
        {
          test: /\.less$/,
          use: [
            isProd ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
            'less-loader',
          ],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Documentation',
        filename: 'index.html',
        template: 'src/docs.html',
        favicon: 'src/favicon/favicon.ico',
        chunks: ['docs'],
      }),
      new HtmlWebpackPlugin({
        title: 'Portfolio',
        filename: 'port.html',
        template: 'src/port.html',
        favicon: 'src/favicon/favicon.ico',
        chunks: ['port'],
      }),
      ...(isProd
        ? [
            new MiniCssExtractPlugin({
              filename: '[name].[contenthash].css',
            }),
          ]
        : []),
    ],
    optimization: {
      minimize: true,
      minimizer: ['...', new CssMinimizerPlugin()],
    },
    devtool: isProd ? 'source-map' : 'eval-source-map',
    devServer: {
      static: {
        directory: path.join(__dirname, 'dist'),
      },
      port: 3000,
      open: true,
      hot: true,
      compress: true,
      historyApiFallback: true,
    },
  }
}
```

Import the LESS file into your JavaScript entry so Webpack can bundle it:

```js
// main.js
import '../less/style.less'
import '../css/style.css' // if you have other css files
```

#### Script: `package.json`

```json
{
  "scripts": {
    "dev": "webpack serve",
    "build": "webpack"
  }
}
```

---

## Add **PostCSS** and **Autoprefixer** to the Project

![PostCSS](https://img.shields.io/badge/PostCSS-DD3A0A?style=for-the-badge&logo=postcss&logoSize=auto&logoColor=white)

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

### Update: `webpack.config.js`

```js
{
  test: /\.css$/i,
  use: [
    isProd ? MiniCssExtractPlugin.loader : 'style-loader',
    'css-loader',
    'postcss-loader',
  ],
},
{
  test: /\.less$/,
  use: [
    isProd ? MiniCssExtractPlugin.loader : 'style-loader',
    'css-loader',
    'postcss-loader',
    'less-loader',
  ],
},
```
