import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Button } from "antd";

import {
  HomeOutlined,
  OrderedListOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";

function renderB() {
  console.log(111);
  import(/* webpackChunkName: "b" */ "./b").then(function (module) {
    const b = module.default;
    b();
  });
}

function Home() {
  const [collapsed, toggleCollapsed] = useState(false);
  return (
    <div>
      {/* <Button
        type="primary"
        onClick={() => toggleCollapsed(!collapsed)}
      >
        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
      </Button> */}
      <Menu mode="horizontal" defaultSelectedKeys={["mail"]}>
        <Menu.Item key="mail" icon={<HomeOutlined />}>
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="app" icon={<OrderedListOutlined />}>
          <Link to="/todo">Todo</Link>
        </Menu.Item>
        <Menu.Item key="testreact" icon={<OrderedListOutlined />}>
          <Link to="/testreact">React 新特性试验</Link>
        </Menu.Item>
        <Menu.Item key="generalcom" icon={<OrderedListOutlined />}>
          <Link to="/generalcom">通用组件</Link>
        </Menu.Item>
      </Menu>
      <header>Home List</header>
      <button onClick={() => renderB()}>点击验证按需加载</button>
    </div>
  );
}

export default Home;
