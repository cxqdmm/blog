var path = require('path');
var webpack = require('webpack');
// var productVersion = "2016121301";
var name = '[name]_[chunkhash]';
// var CompressionWebpackPlugin = require('compression-webpack-plugin');

const common = [
  'react',
  'react-dom',
  'react-router',
  'redux',
  'react-redux',
  'redux-thunk',
  'axios',
  'clipboard',
];

module.exports = {
  entry: {
    "common": common,
  },
  output: {
    path: __dirname + '/scripts/',
    filename: '[name].js',
    library: name
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new webpack.DllPlugin({
      path: 'manifest.json',
      name: name, // 这里跟 output.library 保持一致
      context: __dirname
    }),
    //new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    //new webpack.optimize.DedupePlugin(),
    //new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new webpack.optimize.UglifyJsPlugin({ //js格式化
      comments: false,
      compress: {
        warnings: false
      }
    }),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/),//moment.js locale只添加中文
    //   new CompressionWebpackPlugin({ //gzip 压缩
    //     asset: '[path].gz[query]',
    //     algorithm: 'gzip',
    //     test: new RegExp(
    //         '\\.(js|css)$'    //压缩 js 与 css
    //     ),
    //     threshold: 10240,
    //     minRatio: 0.8
    // })
  ],
  resolve: {
    extensions: ['.js']
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel-loader'],
      exclude: /node_modules/,
      include: __dirname
    }, {
      test: /\.less?$/,
      loaders: [
        'style-loader',
        'css-loader',
        'less-loader?{"sourceMap":false}'
      ],
      include: __dirname
    }, {
      test: /\.(jpe?g|png|gif|svg)$/,
      loader: 'url-loader',
      query: {
        limit: 10240
      }
    }]
  }
};