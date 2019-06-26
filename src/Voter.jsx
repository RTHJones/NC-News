import React, { Component } from 'react';
import * as api from './api';

class Voter extends Component {
    state = {
        voteChange: 0
    }
    render() {
        let { voteChange } = this.state;
        let { votes, id, comment } = this.props;
        return (
            <div>
                <button disabled={voteChange > 0} onClick={() => this.handleVote(id, 1, comment)}>Vote Up</button>
                Votes: {votes + voteChange}
                <button disabled={voteChange < 0} onClick={() => this.handleVote(id, -1, comment)}>Vote Down</button><br />
            </div>
        );
    }
    handleVote = (id, increment, comment) => {
        this.setState({ voteChange: this.state.voteChange + increment })
        api.vote(id, increment, comment)
            .then(res => {
                console.log(res)
            })
            .catch(err => console.log(err))
    }
}

export default Voter;