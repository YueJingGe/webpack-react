const merge = require("webpack-merge");
const common = require("./webpack.common");
const webpack = require('webpack');

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map", // 目的：追踪 error 或者 warning 在源代码中的位置，不要用于生产环境
  devServer: {
    contentBase: "./dist", // 将 dist 目录下的文件 serve 到 localhost:8080 下
    hot: true
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
});
