import React from "react";

//阿里云滑动验证
class SlideVerification extends React.Component {
  componentDidMount() {
    this.slideVerification();
    this.props.onRef(this);
  }
  slideVerification() {
    let that = this;
    var nc_token = [
      "FFFF0N00000000008FF0",
      new Date().getTime(),
      Math.random(),
    ].join(":");

    var NC_Opt = {
      //声明滑动验证需要渲染的目标元素ID。
      renderTo: "#your-dom-id",
      //应用类型标识。它和使用场景标识（scene字段）一起决定了滑动验证的业务场景与后端对应使用的策略模型。您可以在人机验证控制台的配置管理页签找到对应的appkey字段值，请务必正确填写。
      appkey: "FFFF0N00000000008FF0",
      //使用场景标识。它和应用类型标识（appkey字段）一起决定了滑动验证的业务场景与后端对应使用的策略模型。您可以在人机验证控制台的配置管理页签找到对应的scene值，请务必正确填写。
      scene: "nc_register",
      //滑动验证码的主键，请勿将该字段定义为固定值。确保每个用户每次打开页面时，其token值都是不同的。系统默认的格式为：”您的appkey”+”时间戳”+”随机数”。
      token: nc_token,
      //滑动条的宽度。
      customWidth: 300,
      //业务键字段，可为空。为便于线上问题的排查，建议您按照线上问题定位文档中推荐的方法配置该字段值。
      trans: { key1: "code0" },
      //语言。PC端Web页面场景默认支持18国语言，详细配置方法请参见自定义文案与多语言文档。
      language: "cn",
      //是否启用。一般情况，保持默认值（true）即可。
      isEnabled: true,
      //内部网络请求的超时时间。一般情况建议保持默认值（3000ms）。
      timeout: 3000,
      //允许服务器超时重复次数，默认5次。超过重复次数后将触发报错。
      times: 5,
      //前端滑动验证通过时会触发该回调参数。您可以在该回调参数中将请求标识（token）、会话ID（sessionid）、签名串（sig）字段记录下来，随业务请求一同发送至您的服务端调用验签。
      callback: function (data) {
        // window.console && console.log(nc_token)
        // window.console && console.log(data.csessionid)
        // window.console && console.log(data.sig)
        if (data.value == "pass") {
          that.props.onChange(data);
        }
      },
    };
    var nc = new noCaptcha(NC_Opt);
    //用于自定义文案。详细配置方法请参见自定义文案与多语言文档。
    nc.upLang("cn", {
      _startTEXT: "请按住滑块，拖动到最右边",
      _yesTEXT: "验证通过",
      _error300:
        '哎呀，出错了，点击<a href="javascript:__nc.reset()">刷新</a>再来一次',
      _errorNetwork:
        '网络不给力，请<a href="javascript:__nc.reset()">点击刷新</a>',
    });
  }
  render() {
    return <div id="your-dom-id" className="nc-container"></div>;
  }
}
export default SlideVerification;
