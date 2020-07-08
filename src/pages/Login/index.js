import React from "react";
import { withRouter } from "react-router-dom";
import { Form, Input, Button, Checkbox, Divider, message } from "antd";
import SlideVerification from "@utils/slideVerification";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { slideCheck, sendSmsCode, codeLogin } from "@server/request";
import "./index.less";

class Login extends React.Component {
  codeLoginFormRef = React.createRef();

  state = {
    codeText: "获取验证码",
    showSlide: false, // 是否展示滑块
    sending: false, // 是否正在发送中
  };

  timeEvent = null; //计时器
  
  onRef = (e) => {
    this.GV = e;
  };

  // 1. 点击获取验证码->展示滑块验证
  onClickCode = async (field, ref) => {
    console.log(ref, this[ref]);

    const { sending, showSlide } = this.state;
    const curRefForm = this[ref].current; // 当前表单

    if (!sending && showSlide) {
      curRefForm.setFieldsValue({ result: "" });
      this.GV.slideVerification(); //滑动验证重置
    }

    if (!showSlide) {
      curRefForm.validateFields([field], (errors, values) => {});
      const values = await curRefForm.validateFields([field]);
      if (Object.keys(values)) {
        this.setState({
          showSlide: true,
          curField: field,
          curRefForm,
        });
      }
    }
  };

  // 2.开始滑块验证
  onChangeSlide = (value, isSendSmsCode) => {
    const { csessionid, token, sig } = value;
    const params = {
      session_id: csessionid,
      scene: "nc_register",
      token: token,
      sig: sig,
    };

    try {
      let { status } = slideCheck(params);
      if (status === 200 && isSendSmsCode) {
        this.sendSmsCode();
      }
    } catch (error) {
      const { data } = error;
      if (Array.isArray(data)) {
        data.map((item) => {
          const { field, message } = item || {};
          this.state.curRefForm.setFields({
            [field]: {
              errors: [new Error(message)],
            },
          });
        });
      }
    }
  };

  // 3.监听滑动验证成功->获取验证码
  sendSmsCode = () => {
    let params = {
      mobile: this.state.curRefForm.getFieldValue(this.state.curField),
    };
    try {
      let { status } = sendSmsCode(params);
      if (status === 200) {
        this.setTimeEvent();
      }
    } catch (error) {
      this.state.curRefForm.setFieldsValue({ result: "" });
      this.GV.slideVerification(); //滑动验证重置
    }
  };

  // 设置定时器
  setTimeEvent = () => {
    let timeCount = 60;
    this.setState(
      {
        sending: true,
        codeText: "已发送(" + timeCount + ")",
      },
      () => {
        let codeText = "";

        let sending = true;
        this.timeEvent = setInterval(() => {
          timeCount--;
          codeText = "已发送(" + timeCount + ")";
          if (timeCount === 0) {
            clearInterval(this.timeEvent);
            this.timeEvent = null;
            codeText = "获取验证码";
            sending = false;
          }
          this.setState({
            sending,
            codeText,
          });
        }, 1000);
      }
    );
  };

  onFinish = (values) => {
    if (values.result) {
      let { status, data } = codeLogin(values);
      if (status === 200) {
        this.onLoginSuccess(data);
      }
    } else {
      message.error("请先获取验证码，进行滑块验证");
    }
  };

  // 监听登录成功
  onLoginSuccess = (data) => {
    message.success(`用户${data.username}登录成功了`);
    console.log(this.props);

    this.props.history.push("/layout");
  };

  componentWillUnmount() {
    clearInterval(this.timeEvent);
    this.timeEvent = null;
  }

  render() {
    const { codeText, showSlide } = this.state;
    return (
      <div className="login_form_container">
        <Form
          ref={this.codeLoginFormRef}
          name="normal_login"
          initialValues={{ remember: true }}
          onFinish={this.onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "请输入手机号!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="请输入手机号" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "请输入验证码!" }]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="请输入验证码"
              suffix={
                <div
                  onClick={this.onClickCode.bind(
                    this,
                    "username",
                    "codeLoginFormRef"
                  )}
                >
                  <Divider type="vertical" />
                  <span>{codeText}</span>
                </div>
              }
            />
          </Form.Item>
          {showSlide && (
            <Form.Item
              name="result"
              rules={[{ required: true, message: "请先滑动验证!" }]}
            >
              <SlideVerification
                onRef={this.onRef}
                onChange={(value) => this.onChangeSlide(value, true)}
              />
            </Form.Item>
          )}
          <Form.Item>
            <Button type="primary" htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default withRouter(Login);
