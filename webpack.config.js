const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.ts',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    mode: "development",
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    devtool: "inline-source-map",
    plugins: [new HtmlWebpackPlugin()],
    devServer: {
        port: 3000
    }
};