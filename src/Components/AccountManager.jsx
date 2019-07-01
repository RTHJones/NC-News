import React, { Component } from 'react';
import { Link } from '@reach/router'

class AccountManager extends Component {
    state = {
        username: null,
        name: null,
        avatarURL: null
    }
    render() {
        const { username } = this.state;
        return (
            <div>
                <h2>Account Manager</h2><br />
                {!username && <label>Enter Username to Log In:<input type="text" placholder="username"></input><button>Log In</button></label>} <br />
                <br />
                <br />
                <form className="userForm" display="block" > <h3>Create New User </h3><br />
                    <label>
                        Username
                    <input type="text" name="username" />
                    </label><br />
                    <label>
                        Name:
                    <input type="text" name="name" />
                    </label><br />
                    <label>
                        Avatar URL:
                    <input type="text" name="avatar" />
                    </label><br />
                    <label>
                        <input type="submit" value="Create User" />
                    </label><br />
                </form>
                <br />
                <br />
                <Link to='/accounts/users'>
                    <button onClick={this.getUsers}>Show All Users</button>
                </Link>
                <br />
                <br />
                Search Users By Username:
                <input placeholder="username" type="text" name="searchterm"></input><button>Search Now</button>
            </div >

        );
    }
    handleSubmit = (event) => {
        event.preventDefault()
    }
};

export default AccountManager;