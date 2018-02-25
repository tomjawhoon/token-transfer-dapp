require('babel-polyfill');
const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const settings = {
    entry: [
        'babel-polyfill', './src/main.js'
    ],
    output: {
        filename: 'js/[name].js',
        publicPath: './',
        path: path.resolve('dist')
    },
    resolve: {
        extensions: ['.js', '.json']
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            sourceMap: true,
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            importLoaders: 1,
                            plugins: (loader) => [
                                require('autoprefixer')({ browsers: ['last 3 versions'] }),
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.(woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?)$/,
                loader: 'url-loader?limit=10000',
                include: [/[\/\\]node_modules[\/\\]semantic-ui-less[\/\\]/]
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|ttf|eot)$/,
                loader: 'file-loader?name=[name].[ext]?[hash]',
                include: [/[\/\\]node_modules[\/\\]semantic-ui-css[\/\\]/]
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Token Transfer Dapp',
            filename: 'index.html',
            template: 'src/www/main.html'
        })
    ],
};

module.exports = settings;