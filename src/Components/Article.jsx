import React, { Component } from 'react';
import * as api from '../api';
import CommentsList from './CommentsList'
import Voter from './Voter';
import moment from 'moment';
import Deleter from './Deleter';
import { Link, navigate } from '@reach/router';

class Article extends Component {
    state = {
        article: null,
        isLoading: true,
        recentDelete: false
    }
    render() {
        const { article, isLoading, recentDelete } = this.state
        if (isLoading) return <p>Loading...</p>
        return (
            <div>
                {recentDelete && <div>
                <Link to="/articles">
                    Article Deleted. Click here to return to articles page.
                </Link>
                </div>}
                {article && <div className="articleTile">
                    <h3> {article.title}</h3><br />
                    Author: {article.author}<br />
                    Topic: {article.topic}<br />
                    Body: {article.body}<br />
                    Comment Count: {article.comment_count}<br />
                    Created: {moment(article.created_at).fromNow()}<br />
                    <Voter loggedIn={this.props.loggedIn} comment={false} votes={article.votes} id={article.article_id} />
                    <Deleter username={this.props.username} id={article.article_id} article={true} author={article.author} handleDelete={this.handleDelete}/>
                </div>}
                    {!recentDelete && <div><CommentsList loggedIn={this.props.loggedIn} username={this.props.username} id={this.props.id} /></div> }
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
            .catch(err => console.log(err))
    }
    handleDelete = () => {
        this.setState({recentDelete: true, article: ''})
    }
};

export default Article;