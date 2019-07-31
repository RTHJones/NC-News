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
                    <button className="logInButton">Log In</button>
                </Link>}
                {this.props.loggedIn && <>____logged in as: {this.props.username}____</>}
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