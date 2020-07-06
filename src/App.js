import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

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

const Layout = LazyLoad(() =>
  import(/* webpackChunkName: "Layout" */ "./pages/Layout")
);
const Login = LazyLoad(() =>
  import(/* webpackChunkName: "GeneralCom" */ "./pages/Login")
);
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

function App() {
  return (
    <Router>
      <Route path="/login" exact component={Login} />
      <Route
        path="/"
        exact
        render={() => {
          return (
            <Layout>
              <Switch>
                <Route path="/home" exact component={Home} />
                <Route path="/todo" exact component={Todo} />
                <Route path="/testreact" exact component={TestReact} />
                <Route path="/generalcom" exact component={GeneralCom} />
              </Switch>
            </Layout>
          );
        }}
      />
    </Router>
  );
}

export default App;
