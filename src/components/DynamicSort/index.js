import React from "react";
import FlipMove from "react-flip-move";
import "./index.less";

class DynamicSort extends React.Component {
  state = {
    list: [
      {
        id: 1,
        name: 1,
      },
      {
        id: 2,
        name: 2,
      },
      {
        id: 3,
        name: 3,
      },
      {
        id: 4,
        name: 4,
      },
      {
        id: 5,
        name: 5,
      },
      {
        id: 6,
        name: 6,
      },
    ],
  };
  onAdd = () => {
    let current = parseInt(Math.random(1) * 100);
    this.setState(
      {
        list: [...this.state.list, { id: current, name: current }],
      },
      () => {
        this.onSort();
      }
    );
  };
  onDelete = (item) => {
    const { id } = item;
    let arr = [];
    arr = this.state.list.filter((item) => item.id != id);

    this.setState({
      list: arr,
    });
  };
  onSort = () => {
    this.setState({
      list: this.state.list.sort(function (a, b) {
        return a.id - b.id;
      }),
    });
  };
  render() {
    const { list } = this.state;
    const customEnterAnimation = {
      from: { transform: "scale(0.5, 1)" },
      to: { transform: "scale(1, 1)" },
    };

    return (
      <div className="dynamic_sort_container">
        <FlipMove enterAnimation={customEnterAnimation} className="list">
          {list.map((item) => {
            return (
              <div
                key={item.id}
                className="item"
                onClick={this.onDelete.bind(this, item)}
              >
                {item.name}
              </div>
            );
          })}
        </FlipMove>
        <button className="item" onClick={this.onAdd}>
          添加项
        </button>
      </div>
    );
  }
}

export default DynamicSort;
