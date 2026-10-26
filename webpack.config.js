const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production'

  return {
    entry: {
      port: path.resolve(__dirname, 'src/js/port.js'),
      docs: path.resolve(__dirname, 'src/js/docs.js'),
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
        chunks: ['port'],
        minify: isProduction,
      }),

      new HtmlWebpackPlugin({
        title: 'Documentation',
        filename: 'docs.html',
        template: 'src/html/docs.html',
        favicon: 'src/favicon/favicon.ico',
        chunks: ['docs'],
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
