const VueLoaderPlugin = require('vue-loader/lib/plugin')

let path = require('path')
let webpack = require('webpack')
let htmlPlugin = require('html-webpack-plugin')

module.exports = {
  entry: ['./src/index.js'],
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'to-string-loader',
          'css-loader',
          'resolve-url-loader'
        ]
      },
      {
        test: /\.styl(us)?$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'stylus-loader'
        ]
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    noInfo: false,
    contentBase: 'dist'
  },
  devtool: '#eval-source-map',
  plugins: [
    new htmlPlugin({
      minify: { collapseWhitespace: true },
      template: 'index.html',
      hash: true
    }),
    new VueLoaderPlugin()
  ]
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // Add Google Analytics code during production
  // module.exports.entry.push('./src/ga.js')
  // Minify JavaScript
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    })//,
//    new webpack.optimize.UglifyJsPlugin({
//      compress: {
//        warnings: false
//      }
//    })
  ])
}
