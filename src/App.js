import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

function Index() {
  return <div>
    <h1>Todo List</h1>
  </div>
}
function App() {
  return <Router>
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
      </ul>
    </nav>
    <Route path="/" exact component={Index}/>
  </Router>
}

export default App;