import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./index.less";

const Loading = () => <div>loading...</div>;

function LazyLoad(handle) {
  const OtherComponent = lazy(handle);
  return function MyComponent() {
    return (
      <Suspense fallback={<Loading />}>
        <OtherComponent />
      </Suspense>
    );
  };
}

const Home = LazyLoad(() =>
  import(/* webpackChunkName: "Home" */ "./components/Home")
);
const Todo = LazyLoad(() =>
  import(/* webpackChunkName: "Todo" */ "./components/Todo")
);
const TestReact = LazyLoad(() =>
  import(/* webpackChunkName: "TestReact" */ "./components/TestReact")
);
const GeneralCom = LazyLoad(() =>
  import(/* webpackChunkName: "GeneralCom" */ "./components/GeneralCom")
);
const Login = LazyLoad(() =>
  import(/* webpackChunkName: "GeneralCom" */ "./pages/Login")
);

function App() {
  return (
    <Router>
      <Route path="/" exact component={Home} />
      <Route path="/todo" exact component={Todo} />
      <Route path="/testreact" exact component={TestReact} />
      <Route path="/generalcom" exact component={GeneralCom} />
      <Route path="/login" exact component={Login} />
    </Router>
  );
}

export default App;
