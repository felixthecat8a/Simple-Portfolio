# Developing a LESS Project Using Webpack

[![Webpack](https://img.shields.io/badge/developed_with-Webpack-8DD6F9?style=for-the-badge&logo=webpack&logoColor=white)](https://webpack.js.org/)

## Overview

[Webpack](https://webpack.js.org/) is a module bundler that processes JavaScript and other assets for web applications.

With the appropriate loaders and plugins, Webpack can process LESS and CSS, bundle JavaScript, manage images, and generate HTML files.

## Install Dependencies

Install Webpack and its development server:

```shell
yarn add --dev webpack webpack-cli webpack-dev-server
```

Install the stylesheet loaders:

```shell
yarn add --dev style-loader css-loader less less-loader
```

Install the HTML and CSS optimization plugins:

```shell
yarn add --dev html-webpack-plugin mini-css-extract-plugin css-minimizer-webpack-plugin
```

## Project Structure

This example uses two HTML pages:

```text
src/
├── favicon/
│   └── favicon.ico
├── html/
│   ├── index.html
│   └── page.html
├── js/
│   ├── index.js
│   └── script.js
├── less/
│   └── style.less
└── css/
    └── additional.css

webpack.config.js
package.json
```

## Configure Webpack

Create `webpack.config.js`:

```javascript
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production'

  return {
    entry: {
      index: path.resolve(__dirname, 'src/js/index.js'),
      script: path.resolve(__dirname, 'src/js/script.js')
    },

    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'script/[name].bundle.js',
      clean: true
    },

    module: {
      rules: [
        {
          test: /\.less$/i,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
            'less-loader'
          ]
        },
        {
          test: /\.css$/i,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader'
          ]
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource'
        }
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
        ? [ new MiniCssExtractPlugin({ filename: 'style/[name].css' }) ]
        : [])
    ],

    optimization: {
      minimizer: [ '...', new CssMinimizerPlugin() ],
      minimize: isProduction
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
}
```

## Import Stylesheets

Import the LESS stylesheet into the appropriate JavaScript entry point.

For example, in `src/js/index.js`:

```javascript
import '../less/style.less'
```

Webpack will process the imported stylesheet through the configured loaders.

## Configure Scripts

Add these scripts to `package.json`:

```json
{
  "scripts": {
    "dev": "webpack serve --mode development",
    "build": "webpack --mode production"
  }
}
```

## Run the Development Server

```shell
yarn dev
```

The development server opens the site at port 3000.

## Build for Production

```shell
yarn build
```

Webpack generates the production files in `dist/`.

## Notes

- Development mode injects styles into the page using `style-loader`.
- Production mode extracts stylesheets into separate CSS files.
- `CssMinimizerPlugin` optimizes generated CSS.
- `output.clean` removes old build artifacts from the output directory.
- Source maps are enabled during development.

## References

- [Webpack Documentation](https://webpack.js.org/)
- [LESS Documentation](https://lesscss.org/)
