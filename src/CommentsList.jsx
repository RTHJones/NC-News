import React, { Component } from 'react';
import * as api from './api'
import Voter from './Voter'
import moment from 'moment';

class CommentsList extends Component {
    state = {
        showComments: false,
        comments: null,
        userComment: '',
    }
    render() {
        let { comments, showComments } = this.state
        return (
            <div>
                <div className="commentForm" >
                    <form onSubmit={this.handleSubmit}>
                        <label> Add your comment:
                        <input onChange={this.handleChange} type="text" placeholder="Type your comment here" value={this.state.userComment} />
                        </label>
                        <button>Submit Comment</button>
                    </form>
                </div>
                <div className="bubbleCard" onClick={this.toggleComments}>
                    <img className="speechBubble" alt="a speech bubble" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Comments_alt_font_awesome.svg/2000px-Comments_alt_font_awesome.svg.png" />
                    <p>Click here to toggle comments</p>
                </div>
                {showComments && <div>
                    {comments && comments.map(comment => {
                        return (
                            <div key={comment.comment_id} className="commentCard">
                                <p></p>
                                #{comment.comment_id}{` `}By: {comment.author}{` `}<br />
                                {comment.body}<br />
                                Created: {moment(comment.created_at).fromNow()}<br />
                                <Voter comment={true} votes={comment.votes} id={comment.comment_id} />
                                <p></p>
                            </div>
                        )
                    })}
                </div>}

            </div>
        );
    }
    handleSubmit = (event) => {
        event.preventDefault();
        api.addComment(this.props.id, this.state.userComment, this.props.username)
            .then(() => api.fetchComments(this.props.id))
            .then((comments) => this.setState({ comments: comments, userComment: '', showComments: true }));
    }
    handleChange = (event) => {
        this.setState({ userComment: event.target.value })
    }
    toggleComments = () => {
        let { id } = this.props;
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