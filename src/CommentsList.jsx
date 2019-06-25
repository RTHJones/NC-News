import React, { Component } from 'react';
import * as api from './api'

class CommentsList extends Component {
    state = {
        showComments: false,
        comments: null
    }
    render() {
        let { comments, showComments } = this.state
        return (
            <div>
                <div className="bubbleCard" onClick={this.toggleComments}>
                    <img className="speechBubble" alt="a speech bubble" src="https://www.stickpng.com/assets/images/58adf251e612507e27bd3c32.png" />
                    <p>Click here to toggle comments</p>
                </div>
                {showComments && <div>
                    {comments.map(comment => {
                        return (
                            <div key={comment.comment_id} className="commentCard">
                                #{comment.comment_id}{` `}By: {comment.author}{` `}Votes: {comment.votes}<br />
                                {comment.body}<br />
                                Created At: {comment.created_at}<br />
                                <p></p>
                            </div>
                        )
                    })}
                </div>}

            </div>
        );
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