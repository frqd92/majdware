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
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["css-loader"]
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