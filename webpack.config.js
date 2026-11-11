const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production'

  return {
    entry: {
      index: path.resolve(__dirname, 'src/js/port.js'),
      sample: path.resolve(__dirname, 'src/js/ui.js'),
    },

    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'script/[name].bundle.js',
      clean: true,
    },

    module: {
      rules: [
        {
          test: /\.less$/i,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
            'postcss-loader',
            'less-loader',
          ],
        },
        {
          test: /\.css$/i,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
            'postcss-loader',
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
        title: 'Portfolio',
        filename: 'index.html',
        template: 'src/html/port.html',
        favicon: 'src/favicon/favicon.ico',
        chunks: ['index'],
        minify: isProduction,
      }),

      new HtmlWebpackPlugin({
        title: 'UI Sample',
        filename: 'sample.html',
        template: 'src/html/ui.html',
        favicon: 'src/favicon/favicon.ico',
        chunks: ['sample'],
        minify: isProduction,
      }),

      ...(isProduction ? [new MiniCssExtractPlugin({ filename: 'style/[name].css' })] : []),
    ],

    optimization: {
      minimizer: ['...', new CssMinimizerPlugin()],
      minimize: isProduction,
    },

    devtool: isProduction ? false : 'inline-source-map',

    devServer: {
      static: path.resolve(__dirname, 'dist'),
      port: 3000,
      open: true,
      hot: true,
      compress: true,
      historyApiFallback: true,
    },

    mode: isProduction ? 'production' : 'development',
  }
}
