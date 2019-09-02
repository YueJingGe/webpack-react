const merge = require("webpack-merge");
const common = require("./webpack.common");

module.exports = merge(common, {
  mode: "production",
  // devtool: "source-map", // 避免在生产中使用 inline-*** 和 eval-***，因为它们会增加 bundle 体积大小，并降低整体性能。
  plugins: [
    // new webpack.HashedModuleIdsPlugin() // 对于前后两次构建，vendor hash 都应该保持一致。 HashedModuleIdsPlugin 执行时间短，用于生产环境
  ]
});
