import React, { useState, useEffect } from "react";
import ErrorBoundary from "./ErrorBoundary";

function Example() {
  // 声明一个新的叫做 “count” 的 state 变量
  const [age, setAge] = useState(42);
  const [count, setCount] = useState(0);

  // 相当于 componentDidMount 和 componentDidUpdate:
  useEffect(() => {
    console.log(`我变更了 ${count} 次`);
    return () => {
      console.log("组件销毁或者重新执行副作用函数之前触发");
    };
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}

class TestReact extends React.Component {
  state = { theme: "light" };
  changeTheme = () => {
    this.setState({
      theme: this.state.theme === "dark" ? "light" : "dark"
    });
  };
  render() {
    return (
      <div style={{ width: "700px", margin: "0 auto" }}>
        <h1># React v16.0</h1>
        <div>111</div>
        <Example />
      </div>
    );
  }
}

export default ErrorBoundary(TestReact);
