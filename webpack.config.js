const webpack = require('webpack');
const uglifyjs = new webpack.optimize.UglifyJsPlugin({
    compress: {
        warnings: false,
        drop_debugger: true,
        drop_console: true
    },
    output: {
        comments: false,
    },
    sourceMap: false,
    mangle: true
})

const webpackConfig = {
    target: 'web',
    entry:  { miment: './src/miment.js'},
    output: {
        library: 'miment',
        // libraryTarget: 'this',
        path: __dirname + '/dist/',
        publicPath: '/',
        filename:  '[name]-min.js',
    },
    plugins: [uglifyjs],
    module: {
        rules: [{test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'}]
    }
};

module.exports = webpackConfig
