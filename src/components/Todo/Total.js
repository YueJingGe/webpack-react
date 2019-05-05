import React from 'react';
import './index.less';

class Total extends React.Component{
  render() {
    return <div className="my-total">
      <span>进行中：</span>
      <span>已完成：</span>
    </div>
  }
}

export default Total;