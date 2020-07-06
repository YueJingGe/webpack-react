import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { Menu } from "antd";

import {
  HomeOutlined,
  OrderedListOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";

function Home(props) {
  console.log(props);
  
  const [collapsed, toggleCollapsed] = useState(false);
  return (
    <div>
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
      <div>{props.children}</div>
    </div>
  );
}

export default withRouter(Home);
