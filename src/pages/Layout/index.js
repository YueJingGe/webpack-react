import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Menu } from "antd";

import {
  HomeOutlined,
  OrderedListOutlined,
  TeamOutlined,
  GlobalOutlined,
} from "@ant-design/icons";

class Layout extends React.Component {
  state = {
    selectedKeys: ["home"],
  };
  componentDidMount() {
    console.log(this.props.location.pathname);
    const pathname = this.props.location.pathname;
    let key = "";
    if (pathname) {
      key = pathname.split("/")[1];
    }
    this.setState({
      selectedKeys: [key],
    });
  }
  onSelect = ({ item, key, keyPath, selectedKeys, domEvent }) => {
    this.setState({
      selectedKeys,
    });
  };
  render() {
    const { selectedKeys } = this.state;
    return (
      <Menu
        mode="horizontal"
        selectedKeys={selectedKeys}
        onSelect={this.onSelect}
      >
        {/* <Menu.Item key="login" icon={<GlobalOutlined />}>
          <Link to="/login">登录——滑块验证</Link>
        </Menu.Item> */}
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
        <Menu.Item key="phonebook" icon={<TeamOutlined />}>
          <Link to="/phonebook">通讯录——锚点</Link>
        </Menu.Item>
      </Menu>
    );
  }
}

export default withRouter(Layout);
