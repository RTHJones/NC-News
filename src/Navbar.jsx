import React, { Component } from 'react';
import { Link } from '@reach/router';
import * as api from './api';

class Navbar extends Component {
    state = {
        topics: null,
        topic: null,
        authors: [],
        author: null,
        sort_by: null
    }
    render() {
        let { topics, topic, authors, author, sort_by } = this.state;
        return (
            <div className="navbar">
                <Link to="/">
                    <button>Home</button>
                </Link>
                <Link to="/accounts">
                    <button>My Account</button>
                </Link>
                <Link to="/articles">
                    <button>All Articles</button>
                </Link>
                ____logged in as: {this.props.username}____<br />
                <div>Filter Articles By:
                    <select defaultValue='Topic'>
                        <option value={null}>Topic</option>
                        {topics &&
                            topics.map(topic => {
                                return <option>{topic.slug}</option>
                            })
                        }

                    </select>
                    <select defaultValue='Author'>
                        <option value={null}>Author</option>
                        {authors &&
                            authors.map(author => {
                                return <option>{author.username}</option>
                            })
                        }

                    </select>
                    <select defaultValue='Sort_by'>
                        <option value={null}>Sort_by</option>
                        <option>Article ID</option>
                        <option>Author</option>
                        <option>Age</option>
                        <option>Vote Count</option>
                        <option>Comments</option>

                    </select>
                </div>
            </div>
        );
    }
    componentDidMount = () => {
        api.getTopics()
            .then(topics => {
                this.setState({ topics: topics })
            })
            .catch(err => console.log(err))
        api.getAuthors()
            .then(authors => {
                this.setState({ authors: authors })
            })
            .catch(err => console.log(err))
    }
};

export default Navbar;