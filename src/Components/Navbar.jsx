import React, { Component } from 'react';
import { Link } from '@reach/router';

class Navbar extends Component {
    state = {
        data: null
    }
    render() {
        return (
            <div className="navbar">
                {!this.props.loggedIn && 
                <Link to='/accounts'>
                    <button className="navButton">Log In</button>
                </Link>}
                {this.props.loggedIn && <div>
                <Link to="/articles" state={
                    { author: this.props.username}}>
                    <button className="navButton">Logged in as: {this.props.username}</button>
                </Link></div>}
                <Link to="/">
                    <button className="navButton">Home</button>
                </Link>
                <Link to="/accounts">
                    <button className="navButton">My Account</button>
                </Link>
                <Link to="/accounts/users">
                    <button className="navButton">Users</button>
                </Link>
                <Link to="/topics">
                    <button className="navButton">Topics</button>
                </Link>
                <Link to="/create-topic">
                    <button className="navButton">Create Topic</button>
                </Link>
                <Link to="/articles" state={
                    { topic: '' }}>
                    <button className="navButton">Articles</button>
                </Link>
                <Link to="/submit-article" state={
                    { topic: '' }}>
                    <button className="navButton" >Submit Article</button>
                </Link>
                {this.props.loggedIn && <button onClick={() => this.props.logOut()}>Log Out</button>}
            </div>
        );
    };
};

export default Navbar;