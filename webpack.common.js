const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  entry: {
    app: "./src/index.js"
  },
  output: {
    filename: "[name].[hash].js",
    chunkFilename: "[name].js", // 设置按需加载后的chunk名字
    path: path.resolve(__dirname, "dist")
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "从零搭建webpack-react",
      template: "src/assets/index.html"
    }), // 目的：在 dist 文件下生成一个 html 文件，引用所有的新生成的 bundle
    new webpack.HashedModuleIdsPlugin() // 不论是否添加任何新的本地依赖，对于前后两次构建，vendor hash 都应该保持一致：
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: "all",
          test: /[\\/]node_modules[\\/]/,
          name: "vendors"
        } // 将第三方库（例如 lodash 或 react）提取到单独的 vendor chunk 文件中
      }
    }, // 代码分离，防止重复
    runtimeChunk: "single" // 将 runtime 代码拆分为一个单独的 chunk
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react", "@babel/preset-env"],
            plugins: [
              "@babel/plugin-syntax-dynamic-import", // 支持动态的import
              "@babel/plugin-proposal-class-properties", // 使用属性初始化程序语法声明的属性和类属性
              [
                "import",
                {
                  libraryName: "antd",
                  style: true
                }
              ]
            ]
          }
        }
      },
      {
        test: /\.(css|less)$/,
        use: [
          {
            loader: "style-loader"
          },{
            loader: "css-loader"
          },{
            loader: "less-loader",
            options: {
              modifyVars: {
                "primary-color": "#1DA57A",
                "link-color": "#1DA57A",
                "border-radius-base": "2px"
              },
              javascriptEnabled: true
            }
          }
        ]
      }, // 所有以 .css 结尾的文件都被提供给 style-loader 和 css-loader 以及 less-loader
      {
        test: /\.(jpg|png|gif|svg)$/,
        use: ["file-loader"]
      }, // 加载 images 图像
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ["file-loader"]
      }, // 加载 fonts 字体
      {
        test: /\.(csv|tsv)$/,
        use: ["csv-loader"]
      }, // 加载 CSV、TSV
      {
        test: /\.xml$/,
        use: ["xml-loader"]
      } // 加载 xml 文件
    ]
  }
};
