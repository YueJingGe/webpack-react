import React from 'react';

class GeneralCom extends React.Component{
  render() {
    return <div>
      <h1>组件设计原则</h1>
      <ul>
        <li>单一职责：单一职责组件要建立在可复用的基础上</li>
        <li>接口设计符合规范和大众习惯</li>
        <li>通用性：将 DOM 结构的控制权交给开发者,组件只负责行为和最基本的 DOM 结构，比如按钮的颜色、大小、事件处理、位置等都是可以配置的</li>
        <li>健壮性：对传入的值进行有效的校验</li>
      </ul>
    </div>
  }
}

export default GeneralCom;