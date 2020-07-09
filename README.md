# 使用 webpack 从零搭建 react

## 初始化 npm

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

## React 路由地址

https://reactrouter.com/web/guides/quick-start

## 功能介绍

  ### 阿里云滑块验证

      https://help.aliyun.com/document_detail/121893.html?spm=a2c4g.11186623.6.552.26fb307fzeKran

  ### 双向锚点 

      https://www.jianshu.com/p/b22fdc954cd1
