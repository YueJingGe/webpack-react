使用 webpack 从零搭建 react

[[TOC]]

# webpack

## 区分命令

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

  在 import 或加载模块时，对 es6 代码进行预处理，es6 语法转化为 es5 语法。

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
    chunks: "all";
  }
}
```

动态导入：

```js
import(/* webpackChunkName: "lodash" */ "lodash");
```

> 结合不同的框架有不同的解决方案。比如 react：https://reacttraining.com/react-router/web/guides/code-splitting

## 缓存

目的：webpack 编译生成的文件能够被客户端缓存，而在文件内容变化后，能够请求到新的文件。

方法：定义输出文件的名称，[hash]会根据资源内容创建出唯一 hash，当资源内容发生变化的时候，[hash]也会发生变化

`filename: '[name].[hash].js'`

## 最后

webpack 是一个模块打包工具；例如，Browserify 或 Brunch。

而不是一个任务执行工具；例如，Make, Grunt 或者 Gulp。

任务执行工具用来自动化处理常见的开发任务，例如，lint(代码检测)、build(构建)、test(测试)

打包工具帮助你取得准备用于部署的 JavaScript 和 stylesheet，将它们转换为适合浏览器的可用格式。例如，可以通过 压缩、分离 chunk 和 惰性加载 我们的 JavaScript 来提高性能。

# babel

## 作用

JavaScript 编译器

1. 在旧的浏览器环境中，将 ES6 以上的代码转换为向后兼容的 JavaScript 代码。
2. 转换 JSX 语法

## babel-core

有什么用：有些新语法在低版本的 js 中是不存在的，比如：箭头函数、rest 参数、函数默认值等，只能通过将代码转换成 ast，然后再转为低版本的 js。

什么时候用：某些代码需要调用 Babel 的 API 进行转码时，就要使用 babel-core 模块。

## babel-polyfill

## @babel/preset-env

## @babel/preset-react

# Eslint

JavaScript 代码检测工具

## webpack 中配置： `eslint-loader`

```js
{
  enforce: "pre",
  test: /\.js$/,
  exclude: /node_modules/,
  loader: "eslint-loader"
}
```

### 解决 import 报错

`Parsing error: The keyword 'import' is reserved`

`.eslintrc` 文件中配置 `"parser": "babel-eslint"`

### 解决 html 报错

`npm install --save-dev eslint-plugin-html`

`.eslintrc` 文件中配置 `"plugins": ["html"]`

### 关于 react、es6 配置

```js
"parserOptions": {
  "sourceType": "module",
  "ecmaFeatures": {
    "jsx": true
  }
}
```

## 单独配置：`eslint --init`

```bash
? How would you like to configure ESLint? Use a popular style guide
? Which style guide do you want to follow? Airbnb (https://github.com/airbnb/javascript)
? Do you use React? No
? What format do you want your config file to be in? JavaScript
? Would you like to install them now with npm? Yes
```

# react

## index.js 文件

```js
import React from "react";
import ReactDom from "react-dom";

ReactDom.render(<div>hello,react</div>, document.getElementById("root"));
```

### 报错一

```
[WDS] Errors while compiling. Reload prevented.

Module parse failed: Unexpected token (5:2)
You may need an appropriate loader to handle this file type.
|
| ReactDom.render(
>   <div>hello,react</div>,
|   document.getElementById("root")
| );
```

原因：无法支持 jsx 语法，您可能需要适当的加载程序来处理此文件类型。

解决：

1. 安装加载程序

   ```bash
   npm install -D @babel/core babel-loader @babel/preset-env @babel/preset-react
   ```

2. 在 webpack 中配置

   ```js
   module: {
     rules: [
       {
         test: /\.m?js$/,
         exclude: /(node_modules|bower_components)/,
         use: {
           loader: "babel-loader",
           options: {
             presets: ["@babel/preset-react", "@babel/preset-env"]
           }
         }
       }
     ];
   }
   ```

### 报错二

```
Uncaught Invariant Violation: Target container is not a DOM element.
```

解决：在 webpack 中配置

```js
plugins: [
  new HtmlWebpackPlugin({
    title: "从零搭建webpack-react",
    template: "src/assets/index.html" // webpack需要模板的路径
  })
];
```

# react-router

`npm install react-router-dom`

## browserHistory 刷新页面 404

`Cannot GET /todo`

解决：webpack 中配置`historyApiFallback: true`

```js
devServer: {
  historyApiFallback: true;
}
```

## import 编译 less 失败报错

```
ERROR in ./src/components/Todo/index.less 1:0
Module parse failed: Unexpected token (1:0)
You may need an appropriate loader to handle this file type.
> .todo-container{
|   width: 100%;
| }
 @ ./src/components/Todo/index.js 20:0-22
 @ ./src/App.js
 @ ./src/index.js
```

解决：

```js
module: {
  rules: [
    {
      test: /\.(css|less)$/,
      use: ["style-loader", "css-loader", "less-loader"]
    }
  ];
}
```

报错‘less’找不到：

```
Module build failed (from ./node_modules/less-loader/dist/cjs.js):
Error: Cannot find module 'less'
```

原因： `less-loader` 对 `less` 有依赖

解决：安装 `less`

# 组件库 ant design

# redux

`npm install --save redux react-redux`



# 报错 syntax 'classProperties' isn't currently enabled

安装插件：

`npm install --save-dev @babel/plugin-proposal-class-properties`

此插件转换静态类属性以及使用属性初始化程序语法声明的属性。

.babelrc 文件中配置：

```js
{
  "plugins": ["@babel/plugin-proposal-class-properties"]
}
```

# 使用es6类属性时，eslint报Parsing error: Unexpected token =

```js
onPressEnter = e => {
  console.log(e.target.value);
};
```
安装：`npm install eslint babel-eslint --save-dev`
解决：.eslintrc文件中配置 `"parser": "babel-eslint"`

