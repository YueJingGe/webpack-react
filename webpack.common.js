const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  resolve: {
    alias: {
      // 别名
      "@src": path.resolve("src"),
      "@components": path.resolve("src/components"),
      "@pages": path.resolve("src/pages"),
    },
    extensions: [".tsx", ".ts", ".js"],
  },
  // 将不怎么需要更新的第三方库脱离webpack打包，不被打入bundle中，从而减少打包时间
  // externals: {
  //   react: "React",
  //   "react-dom": "ReactDOM",
  //   "react-router-dom": "ReactRouterDOM",
  //   "react-redux": "react-redux",
  //   redux: "redux",
  // },
  entry: {
    app: "./src/index.tsx",
  },
  output: {
    /**
     * 使用 hash 作为 bundle 文件的名称。
     * 这样在文件内容修改时，会计算出新的 hash，浏览器会使用新的名称加载文件，从而使缓存无效。
     * 但是，有些时候某些内容明显没有修改，但是某些 hash 还是会改变。这是因为，注入的 runtime 和 manifest 在每次构建后都会发生变化。
     */
    filename: "[name].[hash].js",
    chunkFilename: "[name].js", // 设置按需加载后的chunk名字
    path: path.resolve(__dirname, "dist"), // resolver 是一个库(library)，用于帮助找到模块的绝对路径
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "从零搭建webpack-react",
      template: "src/assets/index.html",
    }), // 目的：在 dist 文件下生成一个 html 文件，引用所有的新生成的 bundle
    new webpack.HashedModuleIdsPlugin(), // 不论是否添加任何新的本地依赖，对于前后两次构建，vendor hash 都应该保持一致：
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: "all",
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
        }, // 将第三方库（例如 lodash 或 react）提取到单独的 vendor chunk 文件中
      },
    }, // 代码分离，防止重复
    /**
     * runtime，以及伴随的 manifest 数据，用于管理所有模块的交互。
     * 主要是指：在浏览器运行过程中，webpack 用来连接模块化应用程序所需的所有代码。
     * 它包含：在模块交互时，连接模块所需的加载和解析逻辑。
     * 包括：已经加载到浏览器中的连接模块逻辑，以及尚未加载模块的延迟加载逻辑。
     */
    runtimeChunk: "single", // 将 runtime 代码拆分为一个单独的 chunk
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: "ts-loader",
        },
        exclude: /node_modules/,
      },
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
                  style: true,
                },
              ],
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          // {
          //   loader: "px2rem-loader",
          //   options: {
          //     remUni: 75,
          //     remPrecision: 8,
          //   },
          // },
        ],
      },
      {
        test: /\.(css|less)$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "less-loader",
            options: {
              modifyVars: {
                "primary-color": "#1DA57A",
                "link-color": "#1DA57A",
                "border-radius-base": "2px",
              },
              javascriptEnabled: true, // 很重要
            },
          },
        ],
      }, // 所有以 .css 结尾的文件都被提供给 style-loader 和 css-loader 以及 less-loader
      {
        test: /\.(jpg|png|gif|svg)$/,
        use: ["file-loader"],
      }, // 加载 images 图像
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ["file-loader"],
      }, // 加载 fonts 字体
      {
        test: /\.(csv|tsv)$/,
        use: ["csv-loader"],
      }, // 加载 CSV、TSV
      {
        test: /\.xml$/,
        use: ["xml-loader"],
      }, // 加载 xml 文件
    ],
  },
};
