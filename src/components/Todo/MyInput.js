import React from 'react';
import { Input } from 'antd';
import './index.less';

class MyInput extends React.Component{
  render() {
    return <div className="my-input">
      <Input placeholder="回车添加代办事项" />
    </div>
  }
}

export default MyInput;