import React, { Component } from 'react';
import * as api from './api';
import CommentsList from './CommentsList'

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
                    Created At: {article.created_at}<br />
                </div>}
                <CommentsList id={this.props.id} />
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

};

export default Article;