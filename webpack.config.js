var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

const path = require("path");

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: 'app.bundle.js'
  },
  module: {
      rules: [
          {
            test: /\.scss$/,
            use:  ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'sass-loader']
              })
          }
      ]
  },
  plugins: [
    new HtmlWebpackPlugin({
        title: 'Project',
        template: './src/index.html',
        filename: 'index.html',
    }),
    new ExtractTextPlugin({
        filename: 'app.css'
    })
  ]
}
