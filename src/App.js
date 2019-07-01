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
import ErrorPage from './ErrorPage';
import SubmitArticle from './SubmitArticle';
import { Router, Link } from '@reach/router';


class App extends Component {
  state = {
    username: 'grumpy19',
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
          <AccountManager path="/accounts" username={username} />
          <Users path="/accounts/users" username={username} />
          <Articles path="/articles" username={username} />
          <Article path="/articles/:id" username={username} />
          <Topics path="/topics" />
          <SubmitArticle path='/submit-article' username={username} />
          <ErrorPage default />
        </Router>

      </div>
    );
  }
}

export default App;
