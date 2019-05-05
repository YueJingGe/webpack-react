import React from "react";
import ReactDom from "react-dom";
import {createStore } from 'redux';
import { Provider } from 'react-redux';
import todoApp from './reduces';
import App from './App';

const store = createStore(todoApp);

ReactDom.render(
  <Provider store={store}>
    <App/>
  </Provider>, 
  document.getElementById("root")
);
