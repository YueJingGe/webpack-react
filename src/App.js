import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Menu, Icon } from 'antd';
import Home from "./components/Home";
import Todo from "./components/Todo";
import "antd/dist/antd.css";
import "./index.less";

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
