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
        let { users } = this.state;
        return (
            <div>{/*
                <div className="userBar">
                    <select onChange={(event) => {
                        this.handleChange(event, 'topic')
                    }} defaultValue={null}>
                        <option value={''}>Topic</option>
                        {topics && topics.map(topic => {
                            return <option selected={this.state.topic === topic.slug} value={topic.slug}>{topic.slug}</option>
                        })}
                    </select>
                    <select onChange={(event) => this.handleChange(event, 'author')} defaultValue='null'>
                        <option selected value={''}>Author</option>
                        {authors &&
                            authors.map(author => {
                                return <option value={author.username}>{author.username}</option>
                            })
                        }
                    </select> Sort Articles By:
                    <select onChange={(event) => this.handleChange(event, 'sort_by')} defaultValue={null}>
                        <option value="article_id">Article ID</option>
                        <option value="author">Author</option>
                        <option selected={true} value="">Age</option>
                        <option value="votes">Vote Count</option>
                        <option value="comment_count">Comment Count</option>
                    </select>
                    {' '}{' '}Reverse Sort Order:<input type="checkbox" onChange={this.handleCheck}></input>

                    </div>*/}

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