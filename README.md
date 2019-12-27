使用 webpack 从零搭建 react

[[TOC]]

# 初始化 npm

npm init

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

# webpack

- 安装 webpack

  - 使用 weakpack 管理脚本

    原因：`<script>` 标签之间存在隐式依赖关系，手动处理这种依赖很容易出错。

- 安装 webpack-cli

  如果你使用 webpack v4+ 版本，你还需要安装 CLI。

  此工具用于在命令行中运行 webpack。

  比如：npx webpack (以 src/index.js 作为入口起点，生成 dist/main.js 作为输出)

  npx 命令：可以运行 package 中的 webpack 二进制文件 即：./node_modules/.bin/webpack 文件

- 初始化 index.html、index.js 文件

# 使用配置文件 webpack.config.js

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

优点：

    比 CLI 更强大，更灵活

    npx webpack = npx webpack --config webpack.config.js = npm run build

## bundle

将 `src/index.js` 作为起点，生成 `dist/main.js` 作为输出

## 管理资源

loader：预处理文件

- 引入 CSS

  ```bash
  npm install --save-dev style-loader css-loader # 目的：可以在 js 模块中，import 一个 css 文件
  ```

- Less

  style-loader css-loader less-loader

- 加载 images 图像

  file-loder image-webpack-loader(图片压缩，很必要)

- 加载 fonts 字体
- 加载数据

- babel-loader

  在 import 或加载模块时，对 es6 代码进行预处理，es6 语法转化为 es5 语法。

## 管理输出

`[name].bundle.js`：输出不同的入口对应的 bundle

`html-webpack-plugin`：自动生成 index.html，并且引入所有的新生成的 bundle；

`clean-webpack-plugin`：构建之前 清理 /dist 文件夹

## 开发环境

- mode

  `mode: "devewlopment"`：设置开发环境，确保 bundle 是未压缩版本

- 使用 Source Map

  一般情况下，设置了 mode 之后 Source Map 就不需要设置了

  `devtool: "inline-source-map"`：追踪 error 和 warning 在源代码中的位置，用于开发环境

- webpack-dev-server

      1.实时重新加载页面；2.将 dist 目录下的文件 serve 到 localhost:8080 下；3.浏览器自动加载页面

## 模块热替换

允许在运行时更新所有类型的模块，而不需要完全刷新。

通过插件 `new webpack.HotModuleReplacementPlugin()` 来启用 HMR

## minification(代码压缩) 和 tree shaking

通过设置 mode 为 production 来启动代码压缩和 tree shaking（删除未引用的代码）

> 摇动这棵树：你可以将应用程序想象成一棵树。绿色表示实际用到的 source code(源码) 和 library(库)，是树上活的树叶。灰色表示未引用代码，是秋天树上枯萎的树叶。为了除去死去的树叶，你必须摇动这棵树，使它们落下。

`"sideEffects": false`：用来告知 webpack，可以安全的删除没有用到的 export

`mode: "production"`：压缩输出结果，将 mode 设置为生产环境，

## 区分环境：生产环境

development(开发环境) 和 production(生产环境) 这两个环境下的构建目标存在着巨大差异。
在开发环境中，我们需要：强大的 source map 和一个有着 live reloading(实时重新加载) 或 hot module replacement(热模块替换) 能力的 localhost server。
而生产环境目标则转移至其他方面，关注点在于压缩 bundle、更轻量的 source map、资源优化等，
通过这些优化方式改善加载时间。

`merge(common,{})`

common.js、webpack.dev.js、webpack.pro.js

`process.env.NODE_ENV`：环境变量

`devtool: "source-map"`：生产环境下的源码映射

## 代码分离

防止重复：splitChunks

```js
optimization: {
  splitChunks: {
    chunks: "all";
  }
}
```

动态导入：chunkFilename

```js
const { default: _ } = await import(/* webpackChunkName: "lodash" */ "lodash");
```

> 结合不同的框架有不同的解决方案。比如 react：https://reacttraining.com/react-router/web/guides/code-splitting

## 缓存

- 输出文件名 [name].[hash].js

  目的：webpack 编译生成的文件能够被客户端缓存，而在文件内容变化后，能够请求到新的文件。

  方法：定义输出文件的名称，[hash]会根据资源内容创建出唯一 hash，当资源内容发生变化的时候，[hash]也会发生变化

`filename: '[name].[hash].js'`

- 提取引导模板 runtimeChunk

      	将 runtime 代码分离到一个单独的 chunk 中

- 提取第三方库 cacheGroups

  例如 lodash 或 react 提取到单独的 vendor chunk 文件中

- 模块标识符 HashedModuleIdsPlugin

      	没有效果。。❌ （忽略）

## 性能

- 对最少数量的模块使用 loader

  include / exclude

## 公共路径 publicPath

    暂时还不知道什么用途？！

## 外部扩展 externals

    暂时可以不使用

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

- 安装 react、react-dom

## index.js 文件

```js
import React from "react";
import ReactDom from "react-dom";

ReactDom.render(<div>hello,react</div>, document.getElementById("root"));
```

- 解析 jsx babel-loader

  ```js
  {
    test: /\.m?js$/,
    exclude: /(node_modules|bower_components)/,
    use: {
      loader: "babel-loader",
      options: {
        presets: ["@babel/preset-react"] // 重要
      }
    }
  }
  ```

## 配置路由 react-router-dom

具体参考官网：https://reacttraining.com/react-router/ 进行配置

注意路由的写法 '/home/' 这里最后的 '/' 记得去掉，不要带上，否则会出错。

- 解决 BrowserRouter 刷新 404 问题

  historyApiFallback: true

## 配置路由按需加载 react-loadable

- 解决动态导入的问题 @babel/plugin-syntax-dynamic-import

  报错：Support for the experimental syntax 'dynamicImport' isn't currently enabled (8:17)

  ```js
  {
    test: /\.m?js$/,
    exclude: /(node_modules|bower_components)/,
    use: {
      loader: "babel-loader",
      options: {
        presets: ["@babel/preset-react"],
        plugins: ["@babel/plugin-syntax-dynamic-import"] // 重点在此
      }
    }
  }
  ```

## 配置组件 antd

- 按需加载 babel-plugin-import

  优点：只需从 antd 引入模块即可，无需单独引入样式；babel-plugin-import 会帮助你加载 JS 和 CSS

  使用 babel 模块化导入的插件：`npm install babel-plugin-import --save-dev`

  在 webpack 中配置 bable-loader：

  ```js
  {
    module: {
      rules: [
        {
          use: {
            loader: "babel-loader",
            options: {
              // 重点在此 style可设置为 css，但是配置主题时需要使用less文件，所以将其配置为true
              plugins: ["import", { libraryName: "antd", style: true }]
            }
          }
        }
      ];
    }
  }
  ```

- 引入 antd 按需加载之后报错 .bezierEasingMixin(); ^ Inline JavaScript is not enabled.

  如果使用的 webpack 那就在 webpack 的配置中找到 less 的配置，在选项中添加 javascriptEnabled: true

- 定制主题 使用 less 提供的 modifyVars 的方式进行覆盖变量

配置 less-loader 的 options 选项

```js
{
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          },
          {
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
      }
    ];
  }
}
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

# redux

`npm install --save redux react-redux`

- react-redux

  Provider、connect(mapStateToProps、mapDispatchToProps)

- redux

  createStore

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

# 使用 es6 类属性时，eslint 报 Parsing error: Unexpected token =

```js
onPressEnter = e => {
  console.log(e.target.value);
};
```

安装：`npm install eslint babel-eslint --save-dev`
解决：.eslintrc 文件中配置 `"parser": "babel-eslint"`

# 按需加载

## webpack 按需加载

配置文件：

```js
output: {
  chunkFilename:'[name].js',// 用来给拆分后的chunk们起名字的配置项
}
```

- webpack 中 output 的设置并不决定是否拆分代码
- 拆分代码的决定因素在 import 语法上
- webpack 在扫描到代码中有 import 语法的时候，才决定执行拆分代码

## react 路由按需加载 react-loadable

```js
import Loadable from "react-loadable";
const Loading = () => <div>loading...</div>;

const Home = Loadable({
  loader: () => import("./components/Home"),
  loading: Loading
});
const Todo = Loadable({
  loader: () => import("./components/Todo"),
  loading: Loading
});
```

封装 LazyLoad 组件：

```js
const LazyLoad = path => {
  return Loadable({
    loader: () => import(path),
    loading: Loading
  });
};
```

报错：Critical dependency: the request of a dependency is an expression

更改 LazyLoad 组件：

```js
const LazyLoad = loader =>
  Loadable({
    loader,
    loading: Loading
  });
```

使用：

```js
const Home = LazyLoad(() =>
  import(/* webpackChunkName: "Home" */ "./components/Home")
);
const Todo = LazyLoad(() =>
  import(/* webpackChunkName: "Todo" */ "./components/Todo")
);
```

# npm run start 报错：webpack getaddrinfo ENOTFOUND localhost

解决方案：在 host 文件中添加 127.0.0.1 localhost

# webpack 配置别名 alias 需要注意

  - path 配置为绝对路径
  - 配置 alias
  - 配置 tsconfig 中的 baseUrl 和 paths

# local css 模块化不生效

描述：直接在样式文件最外层暴露 footer 不生效

例子：
webpack 配置：

```js
{
	loader: 'css-loader',
	options: {
		importLoaders: 1,
		modules: true,
		localIdentName: '[path][name]__[local]--[hash:base64:5]'
	},
},
```

页面内使用：

```jsx
import styles from './index.module.less';
<div className={style.container}></div>
<footer></footer>
```

index.module.less 样式文件：

```less
// .container 生效
.container {
}
// footer没有被模块化
footer {
}
```

原因：

local 语法 :local(.className) 可以被用来在局部作用域中声明 className。局部的作用域标识符会以模块形式暴露出去。

