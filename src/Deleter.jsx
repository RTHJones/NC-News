import React, { Component } from 'react';
import * as api from './api';

class Deleter extends Component {
    state = {
        id: this.props.id,
        article: this.props.article
    }
    render() {
        return (
            <div>
                <button className="deleteButton" onClick={this.removeItem}>Delete This!</button>
            </div>
        );
    }
    removeItem = () => {
        let { id, article } = this.state
        api.deleteItem(id, article).then(data => {
            console.log(data)
            this.props.refresher()
        })
    }
}

export default Deleter;