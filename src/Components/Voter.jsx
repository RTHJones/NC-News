import React, { Component } from 'react';
import * as api from '../api';
import {navigate} from '@reach/router';

class Voter extends Component {
    state = {
        voteChange: 0
    }
    render() {
        const { voteChange } = this.state;
        const { votes, id, comment } = this.props;
        return (this.props.loggedIn ?
            <div>
                <button disabled={voteChange > 0} onClick={() => this.handleVote(id, 1, comment)}>Vote Up</button>
                Votes: {votes + voteChange}
                <button disabled={voteChange < 0} onClick={() => this.handleVote(id, -1, comment)}>Vote Down</button><br />
            </div> : 'Log in to vote on articles and comments!'
        );
    }
    handleVote = (id, increment, comment) => {
        this.setState({ voteChange: this.state.voteChange + increment })
        api.vote(id, increment, comment)
            .then(res => {
            })
            .catch(navigate('/errorpage', {state: { code: 500, msg: 'Something went wrong, sorry!'}}))
    }
}

export default Voter;