import React from 'react';
function renderB() {
  console.log(111);
  import(/* webpackChunkName: "b" */ './b').then(function(module){
    const b = module.default;
    b();
  })
}

class Home extends React.Component{
  render() {
    return <div>
      <header>Home List</header>
      <button onClick={()=>renderB()}>点击验证按需加载</button>
    </div>
  }
}

export default Home;