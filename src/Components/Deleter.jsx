import React, { Component } from 'react';
import * as api from '../api';

class Deleter extends Component {
    render() {
        return (
            <div>
                 {this.props.username === this.props.author && <div>
                    <button className="deleteButton" onClick={() => this.removeItem(this.props.id, this.props.article)}>Delete This!</button>
                </div>}
            </div>
        );
    }
    removeItem = (id, article) => {
            api.deleteItem(id, article)
                .then(data => {
                this.props.handleDelete()
                })
                .catch(console.dir)
    }
}
export default Deleter;