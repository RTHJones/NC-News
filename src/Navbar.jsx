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
                    { topic: null }}>
                    <button>Articles</button>
                </Link>
                ____logged in as: {this.props.username}____<br />
            </div>
        );
    };
};

export default Navbar;