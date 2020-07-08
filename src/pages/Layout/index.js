import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Menu } from "antd";

import {
  HomeOutlined,
  OrderedListOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";

class Layout extends React.Component {
  render() {
    return (
      <Menu mode="horizontal" defaultSelectedKeys={["home"]}>
        <Menu.Item key="home" icon={<HomeOutlined />}>
          <Link to="/home">Home</Link>
        </Menu.Item>
        <Menu.Item key="todo" icon={<OrderedListOutlined />}>
          <Link to="/todo">Todo</Link>
        </Menu.Item>
        <Menu.Item key="testreact" icon={<OrderedListOutlined />}>
          <Link to="/testreact">React 新特性试验</Link>
        </Menu.Item>
        <Menu.Item key="generalcom" icon={<OrderedListOutlined />}>
          <Link to="/generalcom">通用组件</Link>
        </Menu.Item>
      </Menu>
    );
  }
}

export default withRouter(Layout);
