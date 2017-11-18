import path from 'path';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import ScriptExtHtmlWebpackPlugin from 'script-ext-html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import StyleLintPlugin from 'stylelint-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import ImageminPlugin from 'imagemin-webpack-plugin';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';

const paths = {
  DIST: path.resolve(__dirname, 'dist'),
  SRC: path.resolve(__dirname, 'src'),
  JS: path.resolve(__dirname, 'src/js'),
};

module.exports = {
  devtool: 'inline-source-map',
  entry: path.join(paths.JS, 'index.js'),
  output: {
    path: paths.DIST,
    filename: 'app.bundle.js',
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
        ],
      }, {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
        }),
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(paths.SRC, 'index.html'),
      hash: true,
    }),

    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'async',
    }),

    new StyleLintPlugin(),

    new ExtractTextPlugin('styles.bundle.css'),

    // Minify css
    new OptimizeCssAssetsPlugin(),

    new CopyWebpackPlugin([{
      from: 'src/assets/',
    }]),

    new ImageminPlugin({ test: /\.(jpe?g|png|gif|svg)$/i }),
  ],

  devServer: {
    contentBase: paths.SRC,
    compress: true,
  },

  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: [
      path.join(__dirname, 'node_modules'),
      paths.JS,
    ],
  },
};
