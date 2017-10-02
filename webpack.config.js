var path = require('path');

var config = {
    entry: ['./src/app.tsx'],

    output: {
        path: path.resolve(),
        filename:'build/bundle.js'
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },

    module:{
        loaders:[{
            test: /\.tsx?$/,
            loader: 'ts-loader',
            exclude: /node_modules/
        }]
    }
};

module.exports = config;