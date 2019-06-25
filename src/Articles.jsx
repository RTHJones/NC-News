import React, { Component } from 'react';
import * as api from './api'
import { Link } from '@reach/router'

class Articles extends Component {
    state = {
        articles: null
    }
    render() {
        let { articles } = this.state
        return (
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
        );
    }
    componentDidMount() {

        api.getArticles()
            .then(articles => {
                this.setState({ articles: articles })
            })

    }
};

export default Articles;