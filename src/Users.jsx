import React, { Component } from 'react';
import * as api from './api';
import { Link } from '@reach/router';


class Users extends Component {
    state = {
        users: null,
        page: 1,
        sort_by: '',
        limit: 10,
        grumpy: 'https://ih0.redbubble.net/image.623813976.4374/raf,750x1000,075,t,fafafa:ca443f4786.jpg',
        messy: 'https://vignette.wikia.nocookie.net/mrmen/images/1/1a/MR_MESSY_4A.jpg/revision/latest/scale-to-width-down/250?cb=20170730171002',
        bump: 'https://cdn.shopify.com/s/files/1/0194/0815/8819/t/2/assets/cp-square-mr-bump.jpg?21857',
        tickle: 'https://metrouk2.files.wordpress.com/2016/08/mrmen1.jpg?resize=540,304'
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
                            <Link
                                to={`/articles`}
                                state={
                                    { author: user.username }
                                }>
                                <div className="userCard" key={user.username}>
                                    <p></p>
                                    Username: {user.username}<br />
                                    Name: {user.name}<br />
                                    <div>{this.setUrl(user)} </div><br />
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
    setUrl = (data) => {
        switch (data.username) {
            case 'grumpy19': return <img className="userImg" alt="avatar icon" src={this.state.grumpy} />;
            case 'weegembump': return <img className="userImg" alt="avatar icon" src={this.state.bump} />;
            case 'cooljmessy': return <img className="userImg" alt="avatar icon" src={this.state.messy} />;
            case 'tickle122': return <img className="userImg" alt="avatar icon" src={this.state.tickle} />;
            default: return <img className="userImg" alt="avatar icon" src={data.avatar_url} />
        }
    }
}

export default Users;