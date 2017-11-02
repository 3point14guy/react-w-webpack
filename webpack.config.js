var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

const path = require("path");

module.exports = {
    entry: {
        app: './src/app.js',
        contact: './src/contact.js'
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: '[name].bundle.js'
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
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000,
        stats: "errors-only",
        // open: true this opens the project in a new browser tab each time you run
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Project Demo',
            // hash: true,  this will add a special id to the files built by webpack in the dist folder and a new hash generates each time your run
            excludeChunks: ['contact'],
            filename: 'index.html',
            template: './src/index.html'

        }),
        new HtmlWebpackPlugin({
            title: 'Contact Page',
            chunks: ['contact'],
            filename: 'contact.html',
            template: './src/contact.html'

        }),
        new ExtractTextPlugin({
            filename: 'app.css'
        })
    ]
  }
