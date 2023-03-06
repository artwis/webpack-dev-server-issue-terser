const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = function (env, argv) {
    return {
        name: 'webpack-dev-server-issue-terser',
        mode: 'production',
        target: 'web',
        entry: './src/index.js',
        optimization: {
            minimize: true,
            minimizer: [
                new TerserPlugin({
                    exclude: /node_modules/,
                    terserOptions: {
                        mangle: {
                            properties: { // change this object to false and it starts working
                                keep_quoted: true,
                                debug: true,
                            }
                        },
                    }
                }),
            ],
        },
        devServer: {
            allowedHosts: 'all',
            hot: false,
            watchFiles: {
                paths: [
                    'src/**',
                ],
                options: {
                    usePolling: false,
                },
            },
            compress: true,
            liveReload: true,
            devMiddleware: {
                writeToDisk: true,
            },
            static: {
                watch: true,
                directory: path.resolve(__dirname, "devserver"),
            }
        },
        output: {
            filename: 'index.js',
            path: path.resolve(__dirname, 'dist')
        }
    }

};
