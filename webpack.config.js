const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js', // Ensure to include the .js extension
    output: {
        path: path.join(__dirname, '/build'), // Change to /build if that's what you want
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js']
    },

    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                },
            },
            {
                test: /\.(css|scss)$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    'file-loader',
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            bypassOnDebug: true, // webpack@1.x
                            disable: true, // webpack@2.x and newer
                        },
                    },
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ]
};
