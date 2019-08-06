import React, { Component } from 'react';
import * as api from '../api';
import { Link, navigate } from '@reach/router';
import * as lookup from '../lookup';
import Paginator from './Paginator';



class Users extends Component {
    state = {
        users: '',
        page: 1,
        sort_by: null,
        limit: 5, 
        checked : false,
        totalCount: 0,
        isLoading: true
    }
    render() {
        const { users, page, limit, totalCount, isLoading } = this.state;
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
                <Paginator showPaginator={true} limit={limit} page={page} totalCount={totalCount} handleChange={this.handleChange} changePage={this.changePage} prevState={this.prevState}/>
            </div>
        );
    }
    changePage = (prevState, input) => {
        this.setState(prevState => {
            return ({ page: prevState.page + input })
        })
    }
    componentDidMount = () => {
        this.getUsers()
    }
    componentDidUpdate = (prevProps, prevState) => {
        const { sort_by, checked, page, limit } = this.state;
        const properties = [sort_by, checked, page, limit];
        const propertyNames = ['sort_by', 'checked', 'page', 'limit']
        const needUsers = properties.some(property => {
            return prevState[propertyNames[properties.indexOf(property)]] !== property
        })
        if (needUsers) {
            this.getUsers()
        }
    }
    getUsers = () => {
        const { sort_by, checked, page, limit } = this.state;
        const order = (checked ? 'desc' : 'asc')
        api.fetchAuthors('', order, 1, 100)
            .then(authors => {
                this.setState({totalCount: authors.length})
            })
            .catch(navigate('/errorpage', {state: { code: 500, msg: 'Something went wrong, sorry!'}}))
        api.fetchAuthors(sort_by, order, page, limit)
            .then(authors => {
                this.setState({ isLoading: false, users: authors})
            })
            .catch(navigate('/errorpage', {state: { code: 500, msg: 'Something went wrong, sorry!'}}))
    }
    handleChange = (event, input) => {
        if (input === 'limit') {
            this.setState({ page: 1 })
        };
        this.setState({ [input]: event.target.value })
    }
    handleCheck = () => {
        this.setState({ checked: (this.PrevState.checked ? false : true) })
    }
}

export default Users;