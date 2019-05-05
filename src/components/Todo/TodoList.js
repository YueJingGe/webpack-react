import React from "react";
import { connect } from "react-redux";
import { toggleTodo } from "../../actions";
import { Checkbox } from "antd";
import "./index.less";

class TodoList extends React.Component {
  render() {
    return (
      <div className="todo-list">
        <ul>
          {this.props.todos.map(item => {
            return (
              <li key={item.id}>
                <Checkbox
                  className={item.completed ? "line-through" : ""}
                  checked={item.completed}
                  onChange={() => this.props.onToggleTodo(item.id)}
                >
                  {item.text}
                </Checkbox>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    todos: state.todos
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onToggleTodo: id => {
      dispatch(toggleTodo(id));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);
