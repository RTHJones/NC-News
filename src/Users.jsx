import React, { Component } from 'react';
import * as api from './api';


class Users extends Component {
    state = {
        users: null
    }
    render() {
        let { users } = this.state;
        return (
            <div>
                Users!
                {users && users.map(user => {
                    return (
                        <div>
                            Username: {user.username}<br />
                            Name: {user.name}<br />
                            Avatar: <img alt="avatar icon" src={`${user.url}`} /><br />
                        </div>
                    )
                })}
            </div>
        );
    }
    componentDidMount = () => {
        this.getUsers()
    }

    getUsers = () => {
        api.fetchAuthors()
            .then(authors => {
                console.log(authors)
                this.setState({ users: authors })
            })
            .catch(err => console.log(err))
    }
}

export default Users;