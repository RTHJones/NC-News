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
                <h4>articles go here</h4>
                {articles && <h3> title: {articles[0].title}<br />
                    author: {articles[0].author}<br />
                    id: {articles[0].article_id}<br />
                    topic: {articles[0].topic}<br />
                    votes:  {articles[0].votes}<br />
                    comment count:  {articles[0].comment_count}<br />
                    created at: {articles[0].created_at}</h3>}

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