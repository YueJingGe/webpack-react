import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Menu, Icon } from 'antd';
import "./index.less";

const Loading = () => <div>loading...</div>;

function LazyLoad(handle) {
  const OtherComponent = lazy(handle);
  return function MyComponent() {
    return (
      <Suspense fallback={<Loading />}>
        <OtherComponent />
      </Suspense>
    );
  }
}

const Home = LazyLoad(()=> import(/* webpackChunkName: "Home" */ './components/Home'));
const Todo = LazyLoad(() => import(/* webpackChunkName: "Todo" */ './components/Todo'));
const TestReact = LazyLoad(() => import(/* webpackChunkName: "TestReact" */ './components/TestReact'));
const GeneralCom = LazyLoad(() => import(/* webpackChunkName: "GeneralCom" */ './components/GeneralCom'));

function App() {
  return (
    <Router>
      <Menu mode="horizontal">
        <Menu.Item key="mail">
          <Link to="/">
            <Icon type="home" />
            Home
          </Link>
        </Menu.Item>
        <Menu.Item key="app">
          <Link to="/todo">
            <Icon type="ordered-list" />
            Todo
          </Link>
        </Menu.Item>
        <Menu.Item key="testreact">
          <Link to="/testreact">
            <Icon type="ordered-list" />
            React 新特性试验
          </Link>
        </Menu.Item>
        <Menu.Item key="generalcom">
          <Link to="/generalcom">
            <Icon type="ordered-list" />
            通用组件
          </Link>
        </Menu.Item>
      </Menu>
      <Route path="/" exact component={Home} />
      <Route path="/todo" exact component={Todo} />
      <Route path="/testreact" exact component={TestReact} />
      <Route path="/generalcom" exact component={GeneralCom} />
    </Router>
  );
}

export default App;
