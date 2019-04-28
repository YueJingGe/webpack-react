import "./index.css";

if (process.env.NODE_ENV !== "production") {
  console.log("现在在开发环境");
}

async function getComponent() {
  let element = document.createElement("div");

  const { default: _ } = await import(/* webpackChunkName: "lodash" */ "lodash");

  element.innerHTML = _.join(['Hello', 'webpack'], '');

  return element;
}

getComponent().then(component => {
  document.body.appendChild(component);
});
