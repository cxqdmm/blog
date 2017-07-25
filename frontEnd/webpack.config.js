var path = require('path');
var webpack = require('webpack');
var productVersion = "2017030903";
var HappyPack = require('happypack');

module.exports = {
  cache: true,
  entry:{"bundle":'./frontEnd/src/index',"logInReg":'./frontEnd/src/logInReg'},
  output: {
    path: __dirname + '/scripts/',
    filename: '[name].entry.js',
    publicPath: 'http://localhost:3000/scripts/',
    chunkFilename: '[name].chunk.js?v=' + productVersion,
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new HappyPack({
      id: 'jsx',
    cache: true,
      loaders: [{
        path: 'babel-loader',
        query: {
          plugins: [
            "transform-runtime", "transform-decorators-legacy", "add-module-exports"
          ],
          presets: ['es2015', 'react', "stage-0"],
          cacheDirectory: true
        }
      }],
      threads: 6
    }),
    new webpack.HotModuleReplacementPlugin(),
    // new webpack.NoErrorsPlugin(), //只报出错误或警告，但不会终止编译
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
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require("../manifest.json"),
      // name:'common'
    }),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/),
  ],

  resolve: {
    extensions: ['.js'],
    alias: {
    //   Dropdown: path.join(__dirname, "/src/components/dropdown"),
    //   Breadcrumb: path.join(__dirname, "/src/components/breadcrumb"),
    //   Modal: path.join(__dirname, "/src/components/modal"),
    //   BaseTable: path.join(__dirname, "/src/components/basetable"),
    //   Pagination: path.join(__dirname, "/src/components/pagination"),
    //   Table: path.join(__dirname, "/src/components/table"),
    //   Datepicker: path.join(__dirname, "/src/components/datepicker"),
    //   Tabs: path.join(__dirname, "/src/components/tabs"),
    //   Radio: path.join(__dirname, "/src/components/radio"),
    //   Button: path.join(__dirname, "/src/components/button")
    }
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['happypack/loader?id=jsx'],
      exclude: /node_modules/,
      include: path.join(__dirname, "/src")
    }, {
      test: /\.less?$/,
      loaders: [
        'style-loader',
        'css-loader',
        'less-loader?{"sourceMap":false}'
      ],
      exclude: /node_modules/,
      include: path.join(__dirname, "/src")
    }, {
      test: /\.(jpe?g|png|gif|svg)$/,
      loader: 'url-loader',
      query: {
        limit: 10240
      },
      exclude: /node_modules/
    }]
  }
};