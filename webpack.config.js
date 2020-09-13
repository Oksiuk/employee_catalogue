const path = require ('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
   // context: path.resolve(__dirname, 'src'),
    entry: './src/index.js', 
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        port: 4200
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        }),
        new CleanWebpackPlugin(),    
        new CopyPlugin ({
            patterns: [
                { 
                    from: path.resolve(__dirname, 'src/img'),
                    to: path.resolve(__dirname, 'dist/img')
                },
            ],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: ['file-loader']
            },
        ]
    }
}