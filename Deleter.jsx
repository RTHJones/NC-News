import React, { Component } from 'react';

class Deleter extends Component {
    state = {
        loggedInUser: this.props.loggedInUser,
        itemOwner: this.props.itemOwner
    }
    render() {
        return (
            <div>
                <button onClick={this.removeItem}>Delete This!</button>
            </div>
        );
    }
}

export default Deleter;