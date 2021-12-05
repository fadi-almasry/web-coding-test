import React from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import LoginPage from './pages/LoginPage/LoginPage';
import HomePage from './pages/HomePage/HomePage';
import AlbumsPage from './pages/AlbumsPage/AlbumsPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/albums/:id/:name" component={AlbumsPage} />
        <Route path="/" component={HomePage} />
      </Switch>
    </Router>
  );
}

export default App;
