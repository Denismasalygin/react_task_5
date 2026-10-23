import path from 'node:path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

export default (env, argv) => {
    const isProduction = argv.mode === 'production';

    return {
        mode: isProduction ? 'production' : 'development',

        entry: './src/index.jsx',

        output: {
            path: path.resolve('dist'),
            filename: 'bundle.js',
            publicPath: isProduction ? 'auto' : '/',
            clean: true,
        },

        devtool: isProduction ? 'source-map' : 'eval-source-map',

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
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: 'public/images',
                        to: 'images',
                        noErrorOnMissing: true,
                    },
                ],
            }),
        ],

        devServer: {
            port: 3000,
            open: true,
            hot: true,
            static: {
                directory: path.resolve('public'),
            },
            historyApiFallback: true,
        },
    };
};
