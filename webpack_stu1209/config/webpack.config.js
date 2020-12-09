const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    mode: 'production',
    entry: {
        index: './src/index.js',
        product: './src/product'
    }, //入口
    output: {
        path: path.resolve(__dirname, "../dist/"),
        // filename: 'bundle.js'
        filename: '[name].js' //[name] [hash]hash码 入口文件被修改 hash会重新生成
    },
    module: {
        rules: [{
                test: /\.css$/,
                use: [{
                        // loader: 'style-loader'
                        loader: miniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader'
                    }
                ]
            },
            {
                test: /\.(jpg|png|gif|webp|jpeg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 102400
                    }
                }]
            },
            {
                test: /\.scss$/,
                use: [{
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: "sass-loader"
                    }
                ]
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|brower_components)/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }]
            }

        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "网页标题",
            template: './src/tpl.html',
            inject: 'body',
            minify: {
                removeComments: true,
                removeAttributeQuotes: true,
                collapseWhitespace: true
            },
            filename: "index_1.html"
        }),
        new miniCssExtractPlugin({
            filename: '[name].[hash].css'
        })
    ]
}