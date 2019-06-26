import React, { Component } from 'react';
import * as api from './api'
import { Link } from '@reach/router'

class Articles extends Component {
    state = {
        articles: null,
        topics: null,
        topic: this.props.location.state.topic || null,
        authors: null,
        author: null,
        sort_by: null,
        page: 1
    }
    render() {
        let { articles, topic, topics, authors, page } = this.state;
        return (
            <div>
                <div className="articleBar">Filter Articles By:
                <select onChange={(event) => this.handleChange(event, 'topic')} defaultValue={topic}>
                        <option selected value={null}>Topic</option>
                        {topics && topics.map(topic => {
                            return <option value={topic.slug}>{topic.slug}</option>
                        })}
                    </select>
                    <select onChange={(event) => this.handleChange(event, 'author')} defaultValue='Author'>
                        <option selected value={null}>Author</option>
                        {authors &&
                            authors.map(author => {
                                return <option value={author.username}>{author.username}</option>
                            })
                        }
                    </select>
                    <select onChange={(event) => this.handleChange(event, 'sort_by')} defaultValue={null}>
                        <option selected value={null}>Sort By</option>
                        <option value="article_id">Article ID</option>
                        <option value="author">Author</option>
                        <option value="created_at">Age</option>
                        <option value="votes">Vote Count</option>
                        <option value="comment_count">Comment Count</option>
                    </select>
                </div>
                <div>
                    {articles && <div >
                        {articles.map(article => {
                            return (
                                <div className="articleCard" key={article.title}>
                                    <Link to={`/articles/${article.article_id}`}>
                                        <h3>Article {article.article_id}: {article.title}</h3></Link><br />
                                    author: {article.author}<br />
                                    id: {article.article_id}<br />
                                    topic: {article.topic}<br />
                                    votes:  {article.votes}<br />
                                    comment count:  {article.comment_count}<br />
                                    created at: {article.created_at}<br />
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
            </div>
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
    componentDidUpdate() {
        this.getArticles()
    }

    getArticles = () => {
        let { topic, author, sort_by } = this.state
        api.fetchArticles(topic, author, sort_by)
            .then(articles => {
                this.setState({ articles: articles })
            })
    }
    handleChange = (event, input) => {
        this.setState({ [input]: event.target.value })
        console.log('change places!')
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