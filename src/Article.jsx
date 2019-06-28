import React, { Component } from 'react';
import * as api from './api';
import CommentsList from './CommentsList'
import Voter from './Voter';
import Deleter from './Deleter';
import moment from 'moment';
import { navigate } from '@reach/router';

class Article extends Component {
    state = {
        article: null,
        isLoading: true
    }
    render() {
        let { article, isLoading } = this.state
        if (isLoading) return <p>...Loading</p>
        return (
            <div>
                {article && <div className="articleTile">
                    <h4>Article# {article.article_id}: {article.title}</h4><br />
                    Author: {article.author}<br />
                    Topic: {article.topic}<br />
                    Body: {article.body}<br />
                    Comment Count: {article.comment_count}<br />
                    Created: {moment(article.created_at).fromNow()}<br />
                    <Voter comment={false} votes={article.votes} id={article.article_id} />
                    {article.author === this.props.username && <Deleter id={article.article_id} article={true} refresher={this.handleDelete} />}
                </div>}
                <CommentsList username={this.props.username} id={this.props.id} />
            </div >
        );
    };
    componentDidMount() {
        let { id } = this.props
        this.setState({ isloading: true })
        api.fetchSingleArticle(id)
            .then(article => {
                this.setState({ article: article, isLoading: false })
            })
    }
    handleDelete = () => {
        console.log('article handleDelete has been called, and this is it\'s answer!')
    }

};

export default Article;