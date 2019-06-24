import React, { Component } from 'react';
import { Link } from '@reach/router'

class Navbar extends Component {
    state = {
        buttons: ['home', 'all articles', 'coding', 'football', 'cooking', 'accounts']
    }
    render() {

        return (
            <div>
                <h2>
                    Navbar goes here
            </h2><br />
                <Link to="/articles">
                    <button>articles</button>
                </Link>
                <p>logged in as {this.props.username}</p>
            </div>
        );
    }
};

export default Navbar;