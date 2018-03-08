'use strict'
const path = require('path')
const webpack = require('webpack');
function resolve (dir) {
    return path.join(__dirname, '..', dir)
}
module.exports = {
    entry: {
        app: __dirname+'/index.js'
    },
    output: {
        path: __dirname + "/build",
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [path.resolve(__dirname, "./libs")],
            }
        ]
    },
    resolve: {
        extensions: ['.js'],
    },
    plugins: [

    ]
};
