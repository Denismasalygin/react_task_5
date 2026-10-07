import path from 'node:path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
    mode: 'development',

    entry: './src/index.jsx',

    output: {
        path: path.resolve('dist'),
        filename: 'bundle.js',
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: 'babel-loader',
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
        static: false,
    },
};