const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode: "development",
    devtool: 'inline-source-map',
    devServer: {
        static: './dist',
      },
    entry: "./src/index.js",
    output: {
        filename: "main-[contenthash].js",
        path: path.resolve(__dirname, "dist"),
        assetModuleFilename: "files/[name]-[contenthash][ext]",
        clean: true
    },
    resolve: {
        extensions: ['.js', '.json'],
      },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
              },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            }
        ]
    },
    plugins:  [
        new HtmlWebpackPlugin({template:"/src/template.html"})
    ],
    optimization: {
        runtimeChunk: 'single',
      },

    
}