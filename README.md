This repo is for me following along with Petr Tichy (Ihatetomatoes) youtube series about Webpack 2. It starts here: <https://www.youtube.com/watch?v=JdGnYNtuEtE>

Right in the first video I had some problems following along becuase I was getting the error: webpack: command not found.  I went to <https://webpack.js.org/guides> and followed there install guide.  I thought I found that the reason the webpack command was not working because there was no script built for it yet in package.json, but I still can't use the command webpack. Wherever you see and hear Petr using webpack, it can be replaced with ./node_modules/.bin/webpack and this will work, however.

Video 2:  Just before minute 4, Petr sets the path: in webpack.config.js to 'dist'. Version 3.8.1 requires the path be set as '''\__dirname + \'dist\''''

Also, in the same file, where the HtmlWebpackPlugin is added, a third option of filename: 'index.html', needed to be added for the index.html file to show up in the dist folder.

Video 7: - Multiple templates options and RimRaf: Petr suddenly switches to using 'npm run prod' where he was using 'dev' before.  Moving the index.html file out of the 'dist' folder seems to only work in production version.

Video 8: was about using Pug.  Pug will not be used with this template.

Video 11: There is an edit that needs to be made in the cssProd variable which Petr does not go over.  Change '''publicPath: '/dist'''' to '''publicPath: './''''.  This will allow the background image from .scss to show in production mode.

Also, if you get this error after adding image-webpack-loader: - Error: dyld: Library not loaded: /usr/local/opt/libpng/lib/libpng16.16.dy    lib
then run '''brew install libpng''' and that should fix it.
