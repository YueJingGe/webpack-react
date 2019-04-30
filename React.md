## babel

### 作用

JavaScript 编译器

1. 在旧的浏览器环境中，将 ES6 以上的代码转换为向后兼容的 JavaScript 代码。
2. 转换 JSX 语法

### babel-core

有什么用：有些新语法在低版本的 js 中是不存在的，比如：箭头函数、rest 参数、函数默认值等，只能通过将代码转换成 ast，然后再转为低版本的 js。

什么时候用：某些代码需要调用 Babel 的 API 进行转码时，就要使用 babel-core 模块。

### babel-polyfill
### @babel/preset-env 
### @babel/preset-react

## react

### index.js 文件

```js
import React from "react";
import ReactDom from "react-dom";

ReactDom.render(<div>hello,react</div>, document.getElementById("root"));
```

#### 报错一

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

#### 报错二

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

## react-router

`npm install react-router-dom`


## Eslint

`eslint --init`

```bash
? How would you like to configure ESLint? Use a popular style guide
? Which style guide do you want to follow? Airbnb (https://github.com/airbnb/javascript)
? Do you use React? No
? What format do you want your config file to be in? JavaScript
? Would you like to install them now with npm? Yes
```
