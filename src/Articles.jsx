import React, { Component } from 'react';
import * as api from './api'

class Articles extends Component {
    state = {
        articles: null
    }
    render() {
        let { articles } = this.state
        return (
            <div>
                {articles && <div>
                    {articles.map(article => {
                        return <div>
                            title: {article.title}<br />
                            author: {article.author}<br />
                            id: {article.article_id}<br />
                            topic: {article.topic}<br />
                            votes:  {article.votes}<br />
                            comment count:  {article.comment_count}<br />
                            created at: {article.created_at}<br />
                        </div>
                    })}
                </div>
                }
            </div>
        );
    }
    componentDidMount() {

        api.getArticles()
            .then(articles => {
                console.log(articles)
                this.setState({ articles: articles })
            })

    }
};

export default Articles;