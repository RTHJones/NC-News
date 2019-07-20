import React, { Component } from 'react';
import * as api from '../api';
import { Link } from '@reach/router';
import * as lookup from '../lookup';



class Users extends Component {
    state = {
        users: null,
        page: 1,
        sort_by: '',
        limit: 5, 
        checked : false,
        totalCount: 0,
        isLoading: false
    }
    render() {
        const { users, page, isLoading } = this.state;
        return (
            <div>
                <div className="userBar"> Sort Users By:
                    <select onChange={(event) => this.handleChange(event, 'sort_by')} defaultValue=''>
                        <option value="username">Username</option>
                        <option value="name">Name</option>
                    </select>
                    {' '}{' '}Reverse Sort Order:<input type="checkbox" onChange={this.handleCheck}></input>
                </div>
                {isLoading && <div>Loading Users List...</div>}
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
                                    <img className="userImg" alt="avatar icon" src={user.avatar_url || lookup.userUrls[user.username] || lookup.userUrls.default} /><br />
                                    <p></p>
                                </div>
                            </Link>
                        )
                    })}
                </div>
                <div className="pageBar">
                    <button onClick={() => this.changePage(-1)} disabled={this.state.page === 1}>Previous Page</button>
                    Page: {page}
                    <button onClick={() => this.changePage(1)} disabled={this.state.page >= this.state.totalCount / this.state.limit}>Next Page</button>
                    <label>Users per page
                        <select value={this.state.limit} onChange={(event) => this.handleChange(event, 'limit')}>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="20">20</option>
                        </select>
                    </label>
                </div>
            </div>
        );
    }
    changePage = (input) => {
        this.setState(prevState => {
            return ({ page: prevState.page + input })
        })
    }
    componentDidMount = () => {
        this.getUsers()
    }
    componentDidUpdate = (prevState) => {
        const { sort_by, checked, page, limit } = this.state;
        const properties = [checked];
        const needUsers = properties.some(property => {
            return prevState[property] !== property
        })
        console.log(needUsers, '3')
        if (needUsers) {
            this.getUsers()
        }
    }
    getUsers = () => {
        const { sort_by, checked, page, limit } = this.state;
        const order = (checked ? 'desc' : 'asc')
        api.fetchAuthors(sort_by, order, page, 100)
            .then(authors => {
                console.log(authors.length)
                this.setState({totalCount: authors.length})
            })
            .catch(err => console.dir(err))

            // .then(
            //     api.fetchAuthors(sort_by, order, page, limit)
            //         .then(authors => {
            //             console.log(authors)
            //             this.setState({ users: authors})
            //         })
            //     .catch(err => console.log(err))
            // )
    }
    handleChange = (event, input) => {
        if (input === 'limit') {
            this.setState({ page: 1 })
        };
        this.setState({ [input]: event.target.value })
    }
    handleCheck = () => {
        this.setState({ checked: (this.state.checked ? false : true) })
    }
}

export default Users;