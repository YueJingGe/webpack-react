import React from "react";

export default function ErrorBoundary(WrappedComponent) {
  return class extends React.Component {
    state = { hasError: false, errorInfo: '' };

    componentDidCatch(error, info) {
      this.setState({ hasError: true, errorInfo: info.componentStack });
    }
    render() {
      if (this.state.hasError) {
        return <div style={{border: '1px solid', padding: '10px'}}>
          <h4>当前的组件数据返回错误，但是不影响接下来的渲染！</h4>
          <p>错误信息是： {this.state.errorInfo}</p>
        </div>;
      }
      return <WrappedComponent/>;
    }
  };
}
