import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import Navbar from './Navbar';
import Home from './Home';
import AccountManager from './AccountManager';
import Articles from './Articles';
import Article from './Article';
import Topics from './Topics';
import Users from './Users';
import { Router, Link } from '@reach/router';


class App extends Component {
  state = {
    username: 'jessjelly',
    loggedIn: true
  }
  render() {
    let username = this.state.username
    let loggedIn = this.state.loggedIn
    return (
      <div className="App">
        <Link to="/">
          <Header username={username} loggedIn={loggedIn} />
        </Link>
        <Navbar username={username} loggedIn={loggedIn} />
        <Router>
          <Home path="/" />
          <AccountManager path="/accounts" />
          <Router>
            <Users path="/accounts/users" />
          </Router>
          <Articles path="/articles" />
          <Article path="/articles/:id" />
          <Topics path="/topics" />
        </Router>

      </div>
    );
  }
}

export default App;
