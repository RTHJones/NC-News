import React, { Component } from 'react';
import { Link } from '@reach/router';
import * as api from '../api';
import * as lookup from '../lookup';

class AccountManager extends Component {
    state = {
        username: '',
        name: '',
        avatarUrl: '',
        newUser: '',
        searchedName: '',
        userData: '',
        userFound: false,
        notFoundMsg : false
    }
    render() {
        const { loggedInUser } = this.props;
        const { 
            username, 
            name, 
            avatarUrl, 
            newUser,
            searchedName, 
            userData, 
            userFound, 
            notFoundMsg } = this.state
        return (
            <div>
                <h2>Account Manager</h2>
                {!loggedInUser && <form><label>Enter Username to Log In:<input value={newUser} onChange={(event) => this.handleChange('newUser', event.target.value)} type="text" placeholder="username"></input><button onClick={(event) => {
                    event.preventDefault()
                    this.props.logIn(newUser)
                    this.setState({ newUser: '' })
                }}>Log In</button></label></form>} <br />
                {this.props.invalidUser && <>The Username entered has not been found</>}
                <br />
                <br />
                <form className="userForm" display="block" > <h3 className="userField">Create New User </h3><br />
                    <label>
                        Username
                    <input className="userField" type="text" name="username" value={username} onChange={(event) => this.handleChange('username', event.target.value)} />
                    </label><br />
                    <label>
                        Name:
                    <input className="userField" type="text" name="name" value={name} onChange={(event) => this.handleChange('name', event.target.value)} />
                    </label><br />
                    <label>
                        Avatar URL:
                    <input className="userField" type="text" name="avatar" value={avatarUrl} onChange={(event) => this.handleChange('avatarUrl', event.target.value)} />
                    </label>
                    <br />
                    <label>
                        <br/>
                        <input className="userButton" disabled={!username || !name} type="submit" value="Create User" onClick={this.handleSubmit} />
                    <br/>
                    </label>
                    <br />
                </form>
                <br />
                <br />
                <Link to='/accounts/users'>
                    <button onClick={this.getUsers}>Show All Users</button>
                </Link>
                <br />
                <br />
                <form className="userForm" >
                <h3>Search Users By Username:</h3>
                <input className="userField" onChange={(event) => this.handleChange('searchedName', event.target.value)} value={searchedName} placeholder="username" type="text" name="searchterm"></input>
                <br/>
                <button  disabled={!searchedName} onClick={
                    (event) => {event.preventDefault() 
                    this.getDetails(searchedName)}}>Search Now</button>
                    <br/>
                <button  onClick={this.handleReset}>Reset Search</button>
                <br/>
                </form>
                <div>
                {notFoundMsg && <div>User Not Found</div>}
                {userFound && <div className="userCard" >
                                    <p></p>
                                    Username: {userData.user.username}<br />
                                    Name: {userData.user.name}<br />
                                    <img className="userImg" alt="avatar icon" src={userData.user.avatar_url || lookup.userUrls[userData.user.username] || lookup.userUrls.default} /><br />
                                    <p></p>
                                </div>}
                </div>
            </div >

        );
    }
    getDetails = (username) => {
        api.fetchSingleUser(username)
            .then(
                userData => {
                    if(userData) {this.setState({searchedName : '', userData: userData, userFound : true, notFoundMsg : false})}
                    else {this.setState({searchedName : '', userData: '', userFound : false, notFoundMsg : true})}
                }
            )
            .catch(console.dir)
    }
    handleSubmit = (event) => {
        const { username, name, avatarUrl } = this.state;
        event.preventDefault()
        api.createUser(username, name, avatarUrl)
            .then(info => {
                this.setState({ name: '', username: '', avatarUrl: '' })
                this.props.logIn(info.data["New User Created"].username)
            })
            .catch(console.dir)
    }
    handleChange = (value, input) => {
        this.setState({ [value]: input })
    }
    handleReset = () => {
        this.setState({userFound : false, userData: '', notFoundMsg: '', searchedName : ''})
    }
};

export default AccountManager;