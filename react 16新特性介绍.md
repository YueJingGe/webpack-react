目录

- React v16.0 （2017 年 9 月）
  - render 支持返回数组和字符串
  - 错误边界 componentDidCatch
  - Fiber
- React v16.2 （2017 年 11 月）
  - Fragment
- React v16.3 （2018 年 3 月）
  - Context
  - 创建 Ref 使用回调函数 或者 createRef
  - 组件的生命周期
- React v16.4 （2018 年 5 月）
- React v16.5 （2018 年 9 月）
- React v16.6 （2018 年 10 月）
  - lazy / Suspense
- React v16.7 （2018 年 12 月）
- React v16.8 （2019 年 2 月）
  - Hook

# React v16.0 （2017 年 9 月）

## render 支持返回数组和字符串

```js
render() {
  return [
    <li/>1</li>,
    <li/>2</li>,
    <li/>3</li>,
  ];
}
```

## 错误边界

更优雅的错误处理：如果一个错误在 `组件渲染` 或者 `生命周期` 或者 `构造函数` 中被抛出，整个组件将会被卸载，而不影响其他组件的渲染。

写成高阶组件：

```js
export default function ErrorBoundary(WrappedComponent) {
  return class extends React.Component {
    state = { hasError: false, errorInfo: "" };

    componentDidCatch(error, info) {
      this.setState({ hasError: true, errorInfo: info.componentStack });
    }
    render() {
      if (this.state.hasError) {
        return (
          <div style={{ border: "1px solid", padding: "10px" }}>
            <h4>当前的组件数据返回错误，但是不影响接下来的渲染！</h4>
            <p>错误信息是： {this.state.errorInfo}</p>
          </div>
        );
      }
      return <WrappedComponent />;
    }
  };
}
```

## Fiber

react 核心算法的一次重新实现，将原本同步的更新过程碎片化，避免主线程长时间的阻塞。

利用分片的思想，将耗时任务分成很多小片，每个小片执行完之后，把控制权交给 react 负责协调的模块，如果有紧急任务就优先处理，没有就继续更新。

一个更新过程，两个阶段：

1. 第一阶段：找出需要更新的 DOM，这个阶段是可以被打断的
2. 第二阶段：完成 DOM 的更新展示，这个阶段是不可以被打断的

# React v16.2 （2017 年 11 月）

## Fragment

```js
render() {
  return (
    <React.Fragment>
      <ChildA />
      <ChildB />
      <ChildC />
    </React.Fragment>
  );
}
```

短语法：

```js
render() {
  return (
    <>
      <ChildA />
      <ChildB />
      <ChildC />
    </>
  );
}
```

# React v16.3 （2018 年 3 月）

## Context

```js
// 创建一个 Context 对象
const MyContext = React.createContext(defaultValue);

// 每个 Context 对象都会返回一个 Provider React 组件，它允许消费组件订阅 context 的变化
<MyContext.Provider value={/* 某个值 */}>

// 挂载在 class 上的 contextType 属性会被重赋值给 Context 对象。这能让你使用到 this.context
class MyClass extends React.Component {
  static contextType = MyContext;
  render() {
    let value = this.context;
    /* 基于这个值进行渲染工作 */
  }
}

// 消费组件
<MyContext.Consumer>
  {value => /* 基于 context 值进行渲染*/}
</MyContext.Consumer>
```

## 使用回调函数 或者 createRef 创建 Ref

略。看官网

# 组件的生命周期

## 新增的

- getDerivedStateFromProps
- getSnapshotBeforeUpdate
- componentDidCatch

## 弃用的

- componentWillMount
- componentWillUpdate
- componentWillReceiveProps

官网地址：https://react.docschina.org/docs/react-component.html

# React v16.6 （2018 年 10 月）

## lazy / Suspense

React.lazy()：动态 import 组件，实现代码分隔
Suspense： 等待组价渲染的时候，显示加载标志

写成方法：

```js
import React, { lazy, Suspense } from "react";

function LazyLoad(handle) {
  const OtherComponent = lazy(handle);
  return function MyComponent() {
    return (
      <Suspense fallback={<Loading />}>
        <OtherComponent />
      </Suspense>
    );
  };
}
const Home = LazyLoad(() =>
  import(/* webpackChunkName: "Home" */ "./components/Home")
);
```

# React v16.8 （2019 年 2 月）

## Hook

概念：在不编写 class 的情况下可以使用 state 或者 生命周期 等其他的 react 属性。

限制：只能在 React 函数组件中调用 Hook，不能在 class 组件中使用

学习的第一个 Hook `useState` ：

```js
import React, { useState } from "react";

function Example() {
  // 声明一个新的叫做 “count” 的 state 变量
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

`useEffect`

```js
import React, { useState, useEffect } from "react";

function Example() {
  const [count, setCount] = useState(0);
  // 相当于 componentDidMount 和 componentDidUpdate:
  useEffect(() => {
    console.log(`在每次渲染之后调用副作用函数：我变更了 ${count} 次`);
    return () => {
      console.log(
        "在组件销毁或者后续渲染重新执行副作用函数之前触发，比如：取消订阅"
      );
    };
  });
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

`useContext`：不使用组件嵌套就可以订阅 React 的 Context。

```js
function Example() {
  const locale = useContext(LocaleContext);
  const theme = useContext(ThemeContext);
  // ...
}
```

`useReducer`：通过 reducer 管理组件本地的复杂 state

```js
function Todos() {
  const [todos, dispatch] = useReducer(todosReducer);
  // ...
}
```
