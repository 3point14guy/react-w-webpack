var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');
const path = require("path");
var isProd = process.env.NODE_ENV === 'production'; //tests true false for if I am in production or development
var cssDev = ['style-loader', 'css-loader', 'sass-loader'];
var cssProd = ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: ['css-loader', 'sass-loader'],
    publicPath: './'
})
var cssConfig = isProd ? cssProd : cssDev;

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
              use: cssConfig
            },
            {
              test: /\.(jpe?g|png|gif|svg)$/i,
              use: [
                  // instead of a hash for the file name in the dist folder, this will use the existing file name and extension type from the src folder.  the output path tells where in the dist folder to put these images.
                  // if the output path and public path point ot the same place as it does below:
                  // 'file-loader?name=[name].[ext]&outputPath=images/&publicPath=images/'
                  //then you can use this instead:
                  'file-loader?name=images/[name].[ext]',
                  // optimizes images
                  'image-webpack-loader'
                ]
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
            filename: 'app.css',
            disable: !isProd,
            allChunks: true
        }),
        // this allows changes to update w out reloading the whole page which saves time checking your changes to code.  for development only.
        new webpack.HotModuleReplacementPlugin(),
        // This plugin will cause the relative path of the module to be displayed when HMR is enabled. Suggested for use in development.
        new webpack.NamedModulesPlugin()
    ]
  }
