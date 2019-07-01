import React, { Component } from 'react';
import './App.css';
import Header from './Components/Header';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import AccountManager from './Components/AccountManager';
import Articles from './Components/Articles';
import Article from './Components/Article';
import Topics from './Components/Topics';
import Users from './Components/Users';
import ErrorPage from './Components/ErrorPage';
import SubmitArticle from './Components/SubmitArticle';
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
