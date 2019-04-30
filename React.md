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
