import React, { Component } from 'react';
import { Link } from '@reach/router';
import * as api from '../api';

class AccountManager extends Component {
    state = {
        username: '',
        name: '',
        avatarUrl: '',
        newUser: '',
        searchedName: ''
    }
    render() {
        const { loggedInUser } = this.props;
        const { username, name, avatarUrl } = this.state
        return (
            <div>
                <h2>Account Manager</h2><br />
                {!loggedInUser && <label>Enter Username to Log In:<input value={this.state.newUser} onChange={(event) => this.handleChange('newUser', event.target.value)} type="text" placeholder="username"></input><button onClick={(event) => {
                    this.props.logIn(this.state.newUser)
                    this.setState({ newUser: '' })
                }}>Log In</button></label>} <br />
                {this.props.invalidUser && <>The Username entered has not been found</>}
                <br />
                <br />
                <form className="userForm" display="block" > <h3>Create New User </h3><br />
                    <label>
                        Username
                    <input type="text" name="username" value={username} onChange={(event) => this.handleChange('username', event.target.value)} />
                    </label><br />
                    <label>
                        Name:
                    <input type="text" name="name" value={name} onChange={(event) => this.handleChange('name', event.target.value)} />
                    </label><br />
                    <label>
                        Avatar URL:
                    <input type="text" name="avatar" value={avatarUrl} onChange={(event) => this.handleChange('avatarUrl', event.target.value)} />
                    </label><br />
                    <label>
                        <input disabled={!username || !name} type="submit" value="Create User" onClick={this.handleSubmit} />
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
                <input placeholder="username" type="text" name="searchterm"></input><button onClick={() => this.getDetails(this.state.searchedName)}>Search Now</button>
            </div >

        );
    }
    getDetails = () => {

    }
    handleSubmit = (event) => {
        const { username, name, avatarUrl } = this.state;
        event.preventDefault()
        api.createUser(username, name, avatarUrl)
            .then(info => {
                console.log(info)
                this.setState({ name: '', username: '', avatarUrl: '' })
                this.props.logIn(info.data["New User Created"].username)
            })
            .catch(console.dir)
    }
    handleChange = (value, input) => {
        this.setState({ [value]: input })
    }
};

export default AccountManager;