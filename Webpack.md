# webpack-react

使用 webpack 从零搭建 react

```bash
npm init -y  # 跳过回答问题，直接生成默认的 package.json
npm install webpack webpack-cli --save-dev # --save-dev 在package文件的devDependencies节点写入依赖，生产环境也要使用
npm install --save lodash # --save 在package文件的dependencies节点写入依赖，在开发环境下使用
npm install -g moduleName # -g 将模块安装到全局
npm install moduleName # 将模块安装到项目目录下
npx webpack # 运行的是./node_modules/.bin/webpack这个文件
npx webpack --config webpack.config.js # --config 文件名 表示：可以根据新的配置文件执行构建
npm run build # 代替 npx 命令
```

## 使用 weakpack 管理脚本

原因：`<script>` 标签之间存在隐式依赖关系，手动处理这种依赖很容易出错。

## bundle

将 `src/index.js` 作为起点，生成 `dist/main.js` 作为输出

## 使用配置文件

webpack.config.js

```js
const path = require('path');
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname 'dist')
  }
}
```

## 管理资源

loader：预处理文件

- 引入 CSS

  ```bash
  npm install --save-dev style-loader css-loader # 目的：可以在 js 模块中，import 一个 css 文件
  ```

- 加载 images 图像
- 加载 fonts 字体
- 加载数据

- babel-loader
  
  在import或加载模块时，对es6代码进行预处理，es6语法转化为es5语法。

## 管理输出

`[name].bundle.js`：输出不同的入口对应的 bundle

`html-webpack-plugin`：自动生成 index.html，并且引入所有的新生成的 bundle；

`clean-webpack-plugin`：清理 /dist 文件夹

## 开发环境

`mode: "devewlopment"`：设置开发环境，确保 bundle 是未压缩版本

`devtool: "inline-source-map"`：追踪 error 和 warning 在源代码中的位置，用于开发环境

`webpack-dev-server`：在编译代码后自动重新加载

## 模块热替换

允许在运行时更新所有类型的模块，而不需要完全刷新。

通过插件 `new webpack.HotModuleReplacementPlugin()` 来启用 HMR

## tree shaking

移除未引用的代码。

> 摇动这棵树：你可以将应用程序想象成一棵树。绿色表示实际用到的 source code(源码) 和 library(库)，是树上活的树叶。灰色表示未引用代码，是秋天树上枯萎的树叶。为了除去死去的树叶，你必须摇动这棵树，使它们落下。

`"sideEffects": false`：用来告知 webpack，可以安全的删除没有用到的 export

`mode: "production"`：压缩输出结果，将 mode 设置为生产环境，

## 区分环境：生产环境

`merge(common,{})`

common.js、webpack.dev.js、webpack.pro.js

`process.env.NODE_ENV`：环境变量

`devtool: "source-map"`：生产环境下的源码映射

## 代码分离

防止重复：
```js
optimization: {
  splitChunks: {
    chunks: 'all'
  }
}
```
动态导入：
```js
import(/* webpackChunkName: "lodash" */ 'lodash')
```

> 结合不同的框架有不同的解决方案。比如react：https://reacttraining.com/react-router/web/guides/code-splitting

## 缓存

目的：webpack 编译生成的文件能够被客户端缓存，而在文件内容变化后，能够请求到新的文件。

方法：定义输出文件的名称，[hash]会根据资源内容创建出唯一hash，当资源内容发生变化的时候，[hash]也会发生变化

`filename: '[name].[hash].js'`

## 最后

webpack 是一个模块打包工具；例如，Browserify 或 Brunch。

而不是一个任务执行工具；例如，Make, Grunt 或者 Gulp。

任务执行工具用来自动化处理常见的开发任务，例如，lint(代码检测)、build(构建)、test(测试)

打包工具帮助你取得准备用于部署的 JavaScript 和 stylesheet，将它们转换为适合浏览器的可用格式。例如，可以通过 压缩、分离 chunk 和 惰性加载 我们的 JavaScript 来提高性能。