import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import transactions from './transactions.json';
import Home from './pages/Home';
import Analytics from './pages/Analytics/Analytics';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/analytics">
          <Analytics transactions={transactions} />
        </Route>
        <Route path="/">
          <Home transactions={transactions} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
