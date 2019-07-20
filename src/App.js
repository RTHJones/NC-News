import React, { Component } from 'react';
import './App.css';
import Header from './Components/Header';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import AccountManager from './Components/AccountManager';
import Articles from './Components/Articles';
import Article from './Components/Article';
import Topics from './Components/Topics';
import CreateTopic from './Components/CreateTopic';
import Users from './Components/Users';
import ErrorPage from './Components/ErrorPage';
import SubmitArticle from './Components/SubmitArticle';
import { Router, Link } from '@reach/router';
import * as api from './api';


class App extends Component {
  state = {
    username: 'jessjelly',
    loggedIn: true,
    invalidUser: false
  }
  render() {
    let username = this.state.username
    let loggedIn = this.state.loggedIn
    return (
      <div className="App">
        <Link to="/">
          <Header username={username} loggedIn={loggedIn} />
        </Link>
        <Navbar username={username} loggedIn={loggedIn} logOut={this.logOut} />
        <Router>
          <Home path="/" />
          <AccountManager path="/accounts" invalidUser={this.state.invalidUser} logIn={this.logIn} loggedInUser={username} loggedIn={loggedIn} />
          <Users path="/accounts/users" username={username} />
          <Articles path="/articles" username={username} loggedIn={loggedIn} />
          <Article path="/articles/:id" username={username} loggedIn={loggedIn} />
          <Topics path="/topics" />
          <CreateTopic path="/create-topic" username={username} loggedIn={loggedIn}/>
          <SubmitArticle path='/submit-article' username={username} loggedIn={loggedIn} />
          <ErrorPage default />
        </Router>

      </div>
    );
  }
  logIn = (info) => {
    api.fetchAuthors()
      .then(users => {
        const userlist = users.map(user => user.username)
        if (userlist.includes(info)) {
          this.setState({ username: info, loggedIn: true, invalidUser: false })
        }
        else {
          this.setState({ invalidUser: true, loggedIn: false })
        }
      })
      .catch(console.dir)
  }
  logOut = () => {
    this.setState({ username: '', loggedIn: false })
  }
}

export default App;
