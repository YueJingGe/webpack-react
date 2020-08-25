import React from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import getAlphabetList from "../../utils/getAlphabetList";
import { getPhoneBook } from "../../server/request";
import "./index.less";

class PhoneBook extends React.Component {
  state = {
    value: null,
    positionList: [],
    alphabetList: getAlphabetList(),
    schoolMap: {},
  };
  componentDidMount() {
    this.getPositions();
    this.getData();
  }

  getData = async () => {
    let params = {};
    let res = await getPhoneBook();
    if (res.status == 200) {
      this.setState({
        schoolMap: res.data,
      });
    }
  };
  /**
   *  1. 在React生命周期函数中执行函数
   *  2. 获取每个块的正文内容初始距离浏览器边框的距离 offsetTop
   */
  getPositions = () => {
    // 正文板块绑定的id数组
    const positionList = [];
    this.state.alphabetList.forEach((item, index) => {
      const top = document.getElementById(`${item}`);
      if (top) {
        positionList.push({
          key: item,
          offsetTop: top.getBoundingClientRect().top - 63,
        });
      }
    });
    this.setState({ positionList });
  };

  onInputChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  // 这是滚动方法
  scrollToAnchor = (e) => {
    if (e) {
      // 找到锚点
      const anchorElement = document.getElementById(e.target.innerHTML);
      // 如果对应id的锚点存在，就跳转到锚点
      if (anchorElement) {
        anchorElement.scrollIntoView({
          block: "start",
          behavior: "smooth",
        });
      }
    }
  };

  onSelect = () => {};

  onScrollEvent() {
    const { positionList } = this.state;
    positionList.forEach((item, index) => {
      if (this.scrollRef.scrollTop >= item.offsetTop) {
        document
          .getElementById(`link_${item.key}`)
          .classList.add("active_link");
        positionList.forEach((k, v) => {
          if (item.key !== k.key) {
            document
              .getElementById(`link_${k.key}`)
              .classList.remove("active_link");
          }
        });
      }
    });
  }
  render() {
    const { value, alphabetList, schoolMap, allSchool } = this.state;
    return (
      <div className="phone_book_container">
        {/* 输入框 */}
        <div className="input_box">
          <Input
            size="large"
            placeholder="在联系人中搜索"
            prefix={<SearchOutlined />}
            onChange={this.onInputChange}
            value={value}
          />
        </div>
        <div
          className="phone_book_content"
          onScrollCapture={() => this.onScrollEvent()}
          ref={(c) => {
            this.scrollRef = c;
          }}
        >
          <div className="left">
            {schoolMap && Object.keys(schoolMap).length > 0 ? (
              Object.keys(schoolMap).map((key, index) => {
                return (
                  <section id={key} key={index}>
                    <header className="left_top">{key}</header>
                    <div className="list_box">
                      {schoolMap[key].map((item) => {
                        return (
                          <div
                            key={item.id}
                            onClick={this.onSelect.bind(this, item)}
                          >
                            {item.name}
                          </div>
                        );
                      })}
                    </div>
                  </section>
                );
              })
            ) : (
              <div>数据为空</div>
            )}
          </div>
          <div className="right">
            {alphabetList.map((item) => {
              return (
                <div
                  key={item}
                  className="chart_item"
                  id={`link_${item}`}
                  onClick={this.scrollToAnchor}
                >
                  {item}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default PhoneBook;
