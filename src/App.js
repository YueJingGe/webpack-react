import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { createBrowserHistory as createHistory } from "history";
const history = createHistory();
import LazyLoad from "@utils/LazyLoad";

const Layout = LazyLoad(() =>
  import(/* webpackChunkName: "Layout" */ "@pages/Layout")
);
const Login = LazyLoad(() =>
  import(/* webpackChunkName: "Login" */ "@pages/Login")
);
const Home = LazyLoad(() =>
  import(/* webpackChunkName: "Home" */ "@components/Home")
);
const Todo = LazyLoad(() =>
  import(/* webpackChunkName: "Todo" */ "@components/Todo")
);
const TestReact = LazyLoad(() =>
  import(/* webpackChunkName: "TestReact" */ "@components/TestReact")
);
const PhoneBook = LazyLoad(() =>
  import(/* webpackChunkName: "PhoneBook" */ "@components/PhoneBook")
);
const DynamicSort = LazyLoad(() =>
  import(/* webpackChunkName: "DynamicSort" */ "@components/DynamicSort")
);

function App() {
  return (
    <Router history={history}>
      <Route path="/" exact component={Login} />
      <Route path="/login" exact component={Login} />
      <Route>
        <Layout />
        <Switch>
          <Route path="/home" exact component={Home} />
          <Route path="/todo" exact component={Todo} />
          <Route path="/testreact" exact component={TestReact} />
          <Route path="/phonebook" exact component={PhoneBook} />
          <Route path="/dynamicsort" exact component={DynamicSort} />
          <Redirect from="/layout" to="/home" />
        </Switch>
      </Route>
    </Router>
  );
}

export default App;
