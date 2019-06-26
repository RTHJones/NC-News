import React, { Component } from 'react';

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
                Votes: {votes}
                <button onClick={() => this.handleVote(id, -1)}>Vote Down</button><br />
            </div>
        );
    }
    handleVote = (id, increment) => {
        const { id, voteChange } = this.state;
        this.setState({ voteChange: voteChange + increment })
        console.log('voting!')
    }
}

export default Voter;