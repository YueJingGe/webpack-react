export function slideCheck(params) {
  let res = {
    status: 200,
    data: { ...params },
  };
  return res;
}

export function sendSmsCode(params) {
  let res = {
    status: 200,
    data: {
      mobile: params.mobile,
      code: "111",
    },
  };
  return res;
}

export function codeLogin(params) {
  let res = {
    status: 200,
    data: {
      ...params,
    },
  };
  return res;
}

export function getPhoneBook() {
  let res = {
    status: 200,
    data: {
      A: [
        {
          id: "1382",
          name: "阿里巴巴",
        },
        {
          id: "1394",
          name: "嗷嗷嗷",
        },
      ],
      B: [
        {
          id: "1",
          name: "巴巴",
        },
      ],
      F: [
        {
          id: "1224",
          name: "法法",
        },
      ],
      G: [
        {
          id: "1217",
          name: "各个",
        },
        {
          id: "1225",
          name: "嘎嘎",
        },
        {
          id: "1223",
          name: "规划",
        },
        {
          id: "1219",
          name: "管理",
        },
      ],
      T: [
        {
          id: "1229",
          name: "涛涛",
        },
        {
          id: "1120",
          name: "同意",
        },
        {
          id: "1231",
          name: "头发",
        },
        {
          id: "1001",
          name: "图标",
        },
      ],
      W: [
        {
          id: "1218",
          name: "问问",
        },
        {
          id: "1220",
          name: "挖人",
        },
        {
          id: "1221",
          name: "无法",
        },
        {
          id: "1222",
          name: "文档",
        },
      ],
      Y: [
        {
          id: "1370",
          name: "应用",
        },
        {
          id: "1226",
          name: "以及",
        },
      ],
      Z: [
        {
          id: "1002",
          name: "组织",
        },
      ],
    },
  };
  return res;
}
