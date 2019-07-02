import React, { Component } from 'react';
import * as api from '../api';
import { Link } from '@reach/router';



class Users extends Component {
    state = {
        users: null,
        page: 1,
        sort_by: '',
        limit: 10
    }
    render() {
        const { users } = this.state;
        return (
            <div>

                <div>
                    {users && users.map(user => {
                        return (
                            <Link key={user.username}
                                to={`/articles`}
                                state={
                                    { author: user.username }
                                }>
                                <div className="userCard" >
                                    <p></p>
                                    Username: {user.username}<br />
                                    Name: {user.name}<br />
                                    <img className="userImg" alt="avatar icon" src={user.avatar_url} /><br />
                                    <p></p>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
        );
    }
    componentDidMount = () => {
        this.getUsers()
    }
    getUsers = () => {
        api.fetchAuthors()
            .then(authors => {
                this.setState({ users: authors })
            })
            .catch(err => console.log(err))
    }
}

export default Users;