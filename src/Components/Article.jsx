import React, { Component } from 'react';
import * as api from '../api';
import CommentsList from './CommentsList'
import Voter from './Voter';
import moment from 'moment';
import { navigate } from '@reach/router';

class Article extends Component {
    state = {
        article: null,
        isLoading: true
    }
    render() {
        const { article, isLoading } = this.state
        if (isLoading) return <p>...Loading</p>
        return (
            <div>
                {article && <div className="articleTile">
                    <h3> {article.title}</h3><br />
                    Author: {article.author}<br />
                    Topic: {article.topic}<br />
                    Body: {article.body}<br />
                    Comment Count: {article.comment_count}<br />
                    Created: {moment(article.created_at).fromNow()}<br />
                    <Voter loggedIn={this.props.loggedIn} comment={false} votes={article.votes} id={article.article_id} />
                    {this.props.username === article.author && <div>
                        <button className="deleteButton" onClick={() => this.removeItem(article.article_id, true)}>Delete This!</button>
                    </div>}
                </div>}
                <CommentsList username={this.props.username} id={this.props.id} />
            </div >
        );
    };
    componentDidMount() {
        const { id } = this.props
        this.setState({ isloading: true })
        api.fetchSingleArticle(id)
            .then(article => {
                this.setState({ article: article, isLoading: false })
                if (!article) navigate('/errorpage')
            })
    }
    handleDelete = () => {
        navigate(`/articles`)
    }
    removeItem = (id, article) => {
        api.deleteItem(id, article)
            .then(data => {
                this.handleDelete()
            })
            .catch(console.dir)
    }
};

export default Article;