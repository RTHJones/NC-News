import React, { Component } from 'react';
import { Link } from '@reach/router';

class Navbar extends Component {
    state = {
        data: null
    }
    render() {
        return (
            <div className="navbar">
                <Link to="/">
                    <button>Home</button>
                </Link>
                <Link to="/accounts">
                    <button>My Account</button>
                </Link>
                <Link to="/topics">
                    <button>Topics</button>
                </Link>
                <Link to="/articles" state={
                    { topic: '' }}>
                    <button>Articles</button>
                </Link>
                <Link to="/submit-article" state={
                    { topic: '' }}>
                    <button>Submit Article</button>
                </Link>
                {!this.props.loggedIn && <Link to='/accounts'><>{' '}Click here to log in</></Link>}
                {this.props.loggedIn && <>____logged in as: {this.props.username}____
                <button onClick={() => this.props.logOut()}>Log Out</button></>}
            </div>
        );
    };
};

export default Navbar;