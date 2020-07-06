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
