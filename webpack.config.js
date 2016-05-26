var webpack = require('webpack');
module.exports = {
    entry: {
        'index': './index.js'
    },
    output: {
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel?presets[]=es2015'
            }
        ]
    }
};