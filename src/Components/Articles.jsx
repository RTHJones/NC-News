import React, { Component } from 'react';
import * as api from '../api'
import { Link } from '@reach/router';
import moment from 'moment';

class Articles extends Component {
    state = {
        articles: null,
        topics: null,
        topic: this.props.location.state.topic || '',
        authors: null,
        author: this.props.location.state.author || '',
        sort_by: null,
        page: 1,
        checked: false,
        totalCount: 0,
        limit: 10,
        errorMsg: '',
        isLoading: false
    }
    render() {
        const { articles, topics, authors, page, errorMsg, isLoading } = this.state;
        return (
            <div>
                <div className="articleBar">Filter Articles By:
                <select value={this.state.topic} onChange={(event) => {
                        this.handleChange(event, 'topic')
                    }}>
                        <option value='' >Topic</option>
                        {topics && topics.map(topic => {
                            return <option key={topic.slug} value={topic.slug}>{topic.slug.charAt(0).toUpperCase() + topic.slug.slice(1)}</option>
                        })}
                    </select>
                    <select value={this.state.author} onChange={(event) => {
                        this.handleChange(event, 'author')
                    }}>
                        <option value=''>Author</option>
                        {authors &&
                            authors.map(author => {
                                return <option key={author.username} value={author.username}>{author.username}</option>
                            })
                        }
                    </select> Sort Articles By:
                    <select onChange={(event) => this.handleChange(event, 'sort_by')} defaultValue={null}>
                        <option value="">Age</option>
                        <option value="article_id">Article ID</option>
                        <option value="author">Author</option>
                        <option value="votes">Vote Count</option>
                        <option value="comment_count">Comment Count</option>
                    </select>
                    {' '}{' '}Reverse Sort Order:<input type="checkbox" onChange={this.handleCheck}></input>
                </div>
                <div>
                    {errorMsg && <div><br />{errorMsg}<br /></div>}
                    {isLoading && <div>Loading Articles...</div>}
                    {articles && <div >
                        {articles.map(article => {
                            return (
                                <div className="articleCard" key={article.title}>
                                    <Link to={`/articles/${article.article_id}`}>
                                        <h3> {article.title}</h3></Link><br />
                                    By: {article.author}<br />
                                    Topic: {article.topic}<br />
                                    Votes:  {article.votes}<br />
                                    Comment count:  {article.comment_count}<br />
                                    Created: {moment(article.created_at).fromNow()}<br />
                                    <p>   </p><br />
                                </div>
                            )
                        })}
                    </div>
                    }
                </div>
                <div className="pageBar">
                    <button onClick={() => this.changePage(this.prevState, -1)} disabled={this.state.page === 1}>Previous Page</button>
                    Page: {page}
                    <button onClick={() => this.changePage(this.prevState, 1)} disabled={this.state.page >= this.state.totalCount / this.state.limit}>Next Page</button>
                    <label>Articles per page
                        <select value={this.state.limit} onChange={(event) => this.handleChange(event, 'limit')}>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="20">20</option>
                        </select>
                    </label>
                </div>
            </div >
        );
    }
    changePage = (prevState, input) => {
        this.setState(prevState => {
            return ({ page: prevState.page + input })
        })
    }
    componentDidMount = () => {
        api.fetchTopics()
            .then(topics => {
                this.setState({ topics: topics })
            })
            .catch(err => console.log(err))
        api.fetchAuthors()
            .then(authors => {
                this.setState({ authors: authors })
            })
            .catch(err => console.log(err))
        this.setState({ isLoading: true })
        this.getArticles()
    }
    componentDidUpdate(prevProps, prevState) {
        const { author, topic, sort_by, checked, page, limit } = this.state;
        const properties = [author, topic, sort_by, checked, page, limit];
        const propertyNames = ['author', 'topic', 'sort_by', 'checked', 'page', 'limit']
        const needArticles = prevProps !== this.props || properties.some(property => {
            return prevState[propertyNames[properties.indexOf(property)]] !== property
        })
        if (needArticles) {
            this.getArticles()
        }
    }
    getArticles = () => {
        const { author, sort_by, topic, checked, page, limit } = this.state;
        const order = (checked ? 'asc' : 'desc')
        api.fetchArticles(topic, author, sort_by, order, page, limit)
            .then(data => {
                if (!data) {
                    this.setState({ isLoading: false, errorMsg: 'No Articles Found', articles: '' })
                } else {
                    this.setState({ articles: data.articles, totalCount: data.total_count, errorMsg: '', isLoading: false })
                }
            })
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
};

export default Articles;