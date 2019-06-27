import React, { Component } from 'react';
import * as api from './api'
import { Link } from '@reach/router'
import Moment from 'react-moment';
import moment from 'moment';

class Articles extends Component {
    state = {
        articles: null,
        topics: null,
        topic: this.props.location.state.topic || null,
        authors: null,
        author: this.props.location.state.author || null,
        sort_by: null,
        page: 1,
        checked: false
    }
    render() {
        let { articles, topics, topic, authors, page } = this.state;
        return (
            <div>
                <div className="articleBar">Filter Articles By:
                <select onChange={(event) => {
                        this.handleChange(event, 'topic')
                    }} defaultValue={''}>
                        <option value={''}>Topic</option>
                        {topics && topics.map(topic => {
                            return <option selected={this.state.topic === topic.slug} value={topic.slug}>{topic.slug.charAt(0).toUpperCase() + topic.slug.slice(1)}</option>
                        })}
                    </select>
                    <select onChange={(event) => this.handleChange(event, 'author')} defaultValue={''}>
                        <option value={''}>Author</option>
                        {authors &&
                            authors.map(author => {
                                return <option selected={this.state.author === author.username} value={author.username}>{author.username}</option>
                            })
                        }
                    </select> Sort Articles By:
                    <select onChange={(event) => this.handleChange(event, 'sort_by')} defaultValue={null}>
                        <option selected={true} value="">Age</option>
                        <option value="article_id">Article ID</option>
                        <option value="author">Author</option>
                        <option value="votes">Vote Count</option>
                        <option value="comment_count">Comment Count</option>
                    </select>
                    {' '}{' '}Reverse Sort Order:<input type="checkbox" onChange={this.handleCheck}></input>
                </div>
                <div>
                    {articles && <div >
                        {articles.map(article => {
                            return (
                                <div className="articleCard" key={article.title}>
                                    <Link to={`/articles/${article.article_id}`}>
                                        <h3>Article {article.article_id}: {article.title}</h3></Link><br />
                                    Author: {article.author}<br />
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
                    Page: {page}
                </div>
            </div >
        );
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
        this.getArticles()
    }
    componentDidUpdate(prevProps, prevState) {
        const props = prevProps !== this.props;
        const author = prevState.author !== this.state.author;
        const topic = prevState.topic !== this.state.topic;
        const sort_by = prevState.sort_by !== this.state.sort_by;
        const checked = prevState.checked !== this.state.checked;
        if (props || author || topic || sort_by || checked) {
            this.getArticles()
        }
    }
    getArticles = () => {
        let { author, sort_by, topic, checked } = this.state;
        let order = (checked ? 'asc' : 'desc')
        console.log(order)
        api.fetchArticles(topic, author, sort_by, order)
            .then(articles => {
                this.setState({ articles: articles })
            })
    }
    handleChange = (event, input) => {
        this.setState({ [input]: event.target.value })
    }
    handleCheck = () => {
        this.setState({ checked: (this.state.checked ? false : true) })
    }
    changePage = (prevState, input) => {
        let { page } = this.state
        if (page + input <= 0) { alert('Already on first page') }
        else if (page + input > 'MAXPAGE?!?!?!') { alert('Already on last page') }
        else this.setState(prevState => {
            return ({ page: prevState.page + input })
        })
    }
};

export default Articles;