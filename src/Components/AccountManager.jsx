import React, { Component } from 'react';
import { Link } from '@reach/router'

class AccountManager extends Component {
    state = {
        username: null,
        name: null,
        avatarURL: null,
        newUser: ''
    }
    render() {
        const { loggedInUser } = this.props;
        return (
            <div>
                <h2>Account Manager</h2><br />
                {!loggedInUser && <label>Enter Username to Log In:<input value={this.state.newUser} onChange={(event) => this.handleChange(event.target.value)} type="text" placeholder="username"></input><button onClick={(event) => {
                    this.props.logIn(this.state.newUser)
                    this.setState({ newUser: '' })
                }}>Log In</button></label>} <br />
                {this.props.invalidUser && <>The Username entered has not been found</>}
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
    handleChange = (input) => {
        this.setState({ newUser: input })
        console.log(input)
    }
};

export default AccountManager;