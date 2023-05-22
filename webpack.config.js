const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
mode: "development",
entry: './src/index.js',
devServer: {
    static: './dist',
},
plugins: [
    new HtmlWebpackPlugin({
        template: './src/index.html',
    }),
],
output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
},
module: {
    rules: [
        {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
        },
        {
            test: /\.html$/i,
            use: 'html-loader',
        },
        {
            test: /\.(png|jpg|gif|svg|eot|ttf|woff)$/i,
            type: 'asset/resource',
            generator: {
                filename: 'assets/[name]-[hash][ext]',
            },
        },
    ],
},
}