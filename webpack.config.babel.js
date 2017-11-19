import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ScriptExtHtmlWebpackPlugin from 'script-ext-html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import StyleLintPlugin from 'stylelint-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import ImageminPlugin from 'imagemin-webpack-plugin';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import StyleExtHtmlWebpackPlugin from 'style-ext-html-webpack-plugin';

const paths = {
  DIST: path.resolve(__dirname, 'dist'),
  SRC: path.resolve(__dirname, 'src'),
  JS: path.resolve(__dirname, 'src/js'),
};

const ENV = process.env.npm_lifecycle_event;
const isProd = ENV === 'build';

const envPlugins = [
  new ExtractTextPlugin('styles.bundle.css'),

  new HtmlWebpackPlugin({
    template: path.join(paths.SRC, 'index.html'),
    hash: true,
  }),

  new ScriptExtHtmlWebpackPlugin({
    defaultAttribute: 'async',
  }),

  new StyleExtHtmlWebpackPlugin(),

  new StyleLintPlugin(),
];

if (isProd) {
  envPlugins.push(
    // Uglify js
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        comparisons: true,
        conditionals: true,
        dead_code: true,
        drop_debugger: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
        screw_ie8: true,
        sequences: true,
        unused: true,
        warnings: false,
      },
      output: {
        comments: false,
      },
    }),

    // Minify css
    new OptimizeCssAssetsPlugin(),

    new CopyWebpackPlugin([{
      from: 'src/assets/img',
      to: 'assets/img',
    }]),

    new ImageminPlugin({
      test: /\.(jpe?g|png|gif|svg)$/i,
    })
  );
}

module.exports = {
  devtool: isProd? 'source-map' : 'inline-source-map',
  entry: path.join(paths.JS, 'index.js'),
  output: {
    path: paths.DIST,
    filename: 'app.bundle.js',
  },

  module: {
    rules: [{
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
    }, {
      test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: 'assets/fonts/[name].[ext]',
        },
      },
      ],
    },

    ],
  },

  plugins: envPlugins,

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
