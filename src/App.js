import React, { Component } from 'react';
import './App.css';
import Header from './Header'
import Navbar from './Navbar'
import Home from './Home'
import AccountManager from './AccountManager'
import Articles from './Articles'
import Article from './Article'
import { Router, Link } from '@reach/router'


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
          <Articles path="/articles" />
          <Article path="/article/:id" />
        </Router>

      </div>
    );
  }
}

export default App;
