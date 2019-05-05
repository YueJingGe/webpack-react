import React from 'react';
import { Checkbox, Icon } from 'antd';
import './index.less';

class TodoList extends React.Component{
  render() {
    return <div className="todo-list">
      <ul>
        <li>
          <Checkbox>现在开始</Checkbox>
          <Icon type="close" />
        </li>
      </ul>
    </div>
  }
}

export default TodoList;