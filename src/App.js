import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Menu, Icon } from 'antd';
import Loadable from 'react-loadable';
import "./index.less";

const Loading = () => <div>loading...</div>;

const LazyLoad = loader => Loadable({
  loader,
  loading:Loading,
})

const Home = LazyLoad(()=> import(/* webpackChunkName: "Home" */ './components/Home'));
const Todo = LazyLoad(() => import(/* webpackChunkName: "Todo" */ './components/Todo'));

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
      </Menu>
      <Route path="/" exact component={Home} />
      <Route path="/todo" exact component={Todo} />
    </Router>
  );
}

export default App;
