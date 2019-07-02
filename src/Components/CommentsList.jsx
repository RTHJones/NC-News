import React, { Component } from 'react';
import * as api from '../api'
import Voter from './Voter';
import moment from 'moment';

class CommentsList extends Component {
    state = {
        comments: null,
        showComments: false,
        userComment: '',
        loggedInUser: this.props.user
    }
    render() {
        const { comments, showComments, userComment } = this.state
        return (
            <div>
                <div className="commentForm" >
                    <form onSubmit={this.handleSubmit}>
                        <label> Add your comment:
                        <textarea rows="4" cols="100" onChange={this.handleChange} placeholder="Type your comment here" value={this.state.userComment} />
                        </label>
                        <button disabled={!this.props.loggedIn || userComment === ''}>{this.props.loggedIn ? <>Submit Comment</> : <>Log in to comment!</>}</button>
                    </form>
                </div>
                <div className="bubbleCard" onClick={this.toggleComments}>
                    <img className="speechBubble" alt="a speech bubble" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Comments_alt_font_awesome.svg/2000px-Comments_alt_font_awesome.svg.png" />
                    <p>Click to view comments</p>
                </div>
                {showComments && <div>
                    {comments ? comments.map(comment => {
                        return (
                            <div key={comment.comment_id} className="commentCard">
                                <p></p>
                                #{comment.comment_id}{` `}By: {comment.author}{` `}<br />
                                {comment.body}<br />
                                Created: {moment(comment.created_at).fromNow()}<br />
                                <Voter comment={true} votes={comment.votes} id={comment.comment_id} loggedIn={this.props.loggedIn} />
                                {this.props.username === comment.author && <div>
                                    <button className="deleteButton" onClick={() => this.removeItem(comment.comment_id, false)}>Delete This!</button>
                                </div>}
                                <p></p>
                            </div>
                        )
                    }) : <div className="commentCard"> <h3>No comments found for article</h3></div>}
                </div>}

            </div>
        );
    }

    handleChange = (event) => {
        this.setState({ userComment: event.target.value })
    }
    handleDelete = () => {
        api.fetchComments(this.props.id)
            .then(comments => this.setState({ comments }))
    }
    handleSubmit = (event) => {
        event.preventDefault();
        if (this.state.userComment) {
            api.postComment(this.props.id, this.state.userComment, this.props.username)
                .then(() => api.fetchComments(this.props.id))
                .then((comments) => this.setState({ comments: comments, userComment: '', showComments: true }));
        }
    }
    removeItem = (id, article) => {
        api.deleteItem(id, article)
            .then(data => {
                this.handleDelete()
            })
            .catch(console.dir)
    }
    toggleComments = () => {
        const { id } = this.props;
        api.fetchComments(id)
            .then(comments => {
                this.setState({
                    showComments: (this.state.showComments ? false : true),
                    comments: comments
                })
            })
            .catch(err => console.log(err))

    }
};

export default CommentsList;