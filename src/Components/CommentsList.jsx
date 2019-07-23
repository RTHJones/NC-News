import React, { Component } from 'react';
import * as api from '../api'
import Voter from './Voter';
import moment from 'moment';

class CommentsList extends Component {
    state = {
        comments: null,
        showComments: false,
        userComment: '',
        loggedInUser: this.props.user,
        limit: 10,
        page : 1,
        sort_by: '',
        checked : false,
        totalCount: 0
    }
    render() {
        const { comments, showComments, userComment, limit, page, totalCount } = this.state
        return (
            <div>
                <div className="commentForm" >
                    <form onSubmit={this.handleSubmit}>
                        <label> Add your comment:
                        <textarea rows="4" cols="100" onChange={(event) => this.handleChange(event, 'userComment')} placeholder="Type your comment here" value={this.state.userComment} />
                        </label>
                        <button disabled={!this.props.loggedIn || userComment === ''}>{this.props.loggedIn ? <>Submit Comment</> : <>Log in to comment!</>}</button>
                    </form>
                </div>
                <div className="bubbleCard" onClick={this.toggleComments}>
                    <img className="speechBubble" alt="a speech bubble" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Comments_alt_font_awesome.svg/2000px-Comments_alt_font_awesome.svg.png" />
                    <p>Click to view comments</p>
                </div>
                {showComments && <div className="commentsBar"> Sort Comments By:
                    <select onChange={(event) => this.handleChange(event, 'sort_by')} defaultValue={null}>
                        <option value="created_at">Age</option>
                        <option value="author">Author</option>
                        <option value="votes">Vote Count</option>
                    </select>
                    {' '}{' '}Reverse Sort Order:<input type="checkbox" onChange={this.handleCheck}></input>
                </div>}
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
                {showComments && <div className="pageBar">
                    <button onClick={() => this.changePage(this.prevState, -1)} disabled={page === 1}>Previous Page</button>
                    Page: {page}
                    <button onClick={() => this.changePage(this.prevState, 1)} disabled={page >= totalCount / limit}>Next Page</button>
                    <label>Comments per page
                        <select value={this.state.limit} onChange={(event) => this.handleChange(event, 'limit')}>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="20">20</option>
                        </select>
                    </label>
                </div>}
            </div>
        );
    }
    changePage = (prevState, input) => {
        this.setState(prevState => {
            return ({ page: prevState.page + input })
        })
    }
    componentDidUpdate = (prevProps, prevState) => {
        const { totalCount, sort_by, checked, page, limit } = this.state;
        const properties = [totalCount, sort_by, checked, page, limit];
        const propertyNames = ['totalCount', 'sort_by', 'checked', 'page', 'limit']
        const needComments = prevProps !== this.props || properties.some(property => {
            return prevState[propertyNames[properties.indexOf(property)]] !== property
        })
        if (needComments) {
            this.getComments()
        }
    }
    componentDidMount = () => {
        this.getComments()
    }
    getComments = () => {
        const { id } = this.props;
        const {limit, page, sort_by, checked} = this.state;
        const order = (checked ? 'asc' : 'desc')
        api.fetchComments(id)
            .then(comments => {
                if(comments) {this.setState({
                    totalCount: comments.length || 0
                })}
            })
            .catch(err => console.log(err));
        api.fetchComments(id, limit, page, sort_by, order)
            .then(comments => {
                if(comments) this.setState({comments})
            })
            .catch(err => console.log(err))
    }
    handleChange = (event, input) => {
        if (input === 'limit') {
            this.setState({ page: 1 })
        };
        this.setState({ [input]: event.target.value })
    }
    handleCheck = () => {
        this.setState({ checked: (this.state.checked ? false : true) })
    }
    handleDelete = () => {
        api.fetchComments(this.props.id)
            .then(comments => this.setState({ totalCount: comments.length, comments }))
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
        this.setState({showComments: (this.state.showComments ? false : true)})
        if(this.state.showComments) {
            this.getComments()
        }
    }
};
export default CommentsList;