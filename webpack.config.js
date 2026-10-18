import path from 'node:path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
    mode: 'production',

    entry: './src/index.jsx',

    output: {
        path: path.resolve('dist'),
        filename: 'bundle.js',
        publicPath: 'auto',
        clean: true,
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.module\.scss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            esModule: true,
                            modules: {
                                namedExport: false,
                            },
                        },
                    },
                    'sass-loader',
                ],
            },
            {
                test: /\.scss$/,
                exclude: /\.module\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            },
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
    ],

    devServer: {
        port: 3000,
        open: true,
        static: {
            directory: path.resolve('public'),
        },
        historyApiFallback: true,
    },
};
