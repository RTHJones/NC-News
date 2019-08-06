import React, { Component } from 'react';
import * as api from '../api';
import {navigate} from '@reach/router';

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
                .catch(navigate('/errorpage', {state: { code: 500, msg: 'Something went wrong, sorry!'}}))
    }
}
export default Deleter;