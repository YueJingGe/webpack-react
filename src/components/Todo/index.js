import React from 'react';
import MyInput from './MyInput';
import Total from './Total';
import TodoList from './TodoList';
import './index.less';

class Todo extends React.Component{
  render() {
    return <div className="todo-container">
      <header>Todo List</header>
      <MyInput/>
      <TodoList/>
    </div>
  }
}

export default Todo;