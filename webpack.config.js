const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const path = require("path");
const bootstrapEntryPoints = require('./webpack.bootstrap.config');
const glob = require('glob-all');
const PurifyCSSPlugin = require('purifycss-webpack');
const handlebars = require('handlebars');

const isProd = process.env.NODE_ENV === 'production'; //tests true false for if I am in production or development
const cssDev = ['style-loader', 'css-loader', 'sass-loader'];
const cssProd = ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: ['css-loader', 'sass-loader'],
    publicPath: './'
})
const cssConfig = isProd ? cssProd : cssDev;
const bootstrapConfig = isProd ? bootstrapEntryPoints.prod : bootstrapEntryPoints.dev;

module.exports = {
    entry: {
        app: './src/index.js',
        contact: './src/contact.js',
        bootstrap: bootstrapConfig
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
              test: /\.scss$/,
              use: cssConfig
            },
            {
              test: /\.js$/,
              exclude: /node_modules/,
              use: 'babel-loader'
            },
            {
              test: /\.(jpe?g|png|gif|svg)$/i,
              use: [
// instead of a hash for the file name in the dist folder, this will use the existing file name and extension type from the src folder.  the output path tells where in the dist folder to put these images.
// if the output path and public path point ot the same place as it does below:
//'file-loader?name=[name].[ext]&outputPath=images/&publicPath=images/'
                  //then you can use this instead:
                  'file-loader?name=images/[name].[ext]',
                  // optimizes images
                  'image-webpack-loader'
                ]
            },
            // these are tests for bootstrap icon fonts
            { test: /\.(woff2?|svg)$/, loader: 'url-loader?limit=10000&name=fonts/[name]' },
            { test: /\.(ttf|eot)$/, loader: 'file-loader?name=fonts/[name].[ext]' },
            // Bootstrap 3
            { test:/bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/, loader: 'imports-loader?jQuery=jquery' },
            {
              test: /\.(hbs|handlebars)$/,
              loader: 'handlebars-loader',
              query: {
                helperDirs: [
                  path.join(__dirname, 'dist/templates/helpers')
                ]
            }
          }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        hot: true,
        port: 9000,
        stats: "errors-only"
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
            filename: 'css/[name].css',
            disable: !isProd,
            allChunks: true
        }),
        // this allows changes to update w out reloading the whole page which saves time checking your changes to code.  for development only.
        new webpack.HotModuleReplacementPlugin(),
        // This plugin will cause the relative path of the module to be displayed when HMR is enabled. Suggested for use in development.
        new webpack.NamedModulesPlugin(),
        // make sure this is after the ExtractTextPlugin
        new PurifyCSSPlugin({
            //checks all html files for style elements and specifys only those to be used from bootstrap.
            paths: glob.sync([
              path.join(__dirname, 'src/*.html'),
              path.join(__dirname, 'src/*.js')
            ])
        })
    ]
  }
