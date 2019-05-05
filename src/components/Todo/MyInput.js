import React from "react";
import { connect } from "react-redux";
import { addTodo } from "../../actions";
import { Input } from "antd";
import "./index.less";

class MyInput extends React.Component {
  onPressEnter = e => {
    this.props.dispatch(addTodo(e.target.value));
    e.target.value = "";
  };
  render() {
    return (
      <div className="my-input">
        <Input
          placeholder="回车添加代办事项"
          onPressEnter={this.onPressEnter}
        />
      </div>
    );
  }
}

export default connect()(MyInput);