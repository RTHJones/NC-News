import React, { Component } from 'react';
import * as api from './api';

class Voter extends Component {
    state = {
        itemType: 'article_id',
        id: null,
        votes: null,
        voteChange: 0
    }
    render() {
        let { itemType, id, votes, voteChange } = this.state;
        return (
            <div>
                <button onClick={() => this.handleVote(id, 1)}>Vote Up</button><br />
                Votes: {votes + voteChange}
                <button onClick={() => this.handleVote(id, -1)}>Vote Down</button><br />
            </div>
        );
    }
    handleVote = (id, increment) => {

        this.setState({ voteChange: this.state.voteChange + increment })
        console.log('voting!')
        api.vote(id, increment)
            .then(res => {
                console.log(res)
            })
            .catch(err => console.log(err))
    }
}

export default Voter;