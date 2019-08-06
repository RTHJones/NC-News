import React, { Component } from 'react';
import * as api from '../api';
import {navigate} from '@reach/router';

class CreateTopic extends Component {
    state = {
        slug : '',
        description : '',
        imgURL : '',
        username: this.props.username || '',
        newTopicData: ''
    }
    render() {
        const {slug, description, imgURL, username} = this.state
        return (
            <div>
                <h2>Topic Creation Form</h2>
                <label> {this.props.loggedIn ? <>You are logged in as: "{username}"</> : <div className='submissionWarning'>You must log in to create a topic!</div>}
                    <form className='topicForm' onSubmit={this.handleSubmit}>
                        <label>
                            Topic:
                            <input className='topicFormComponent' onChange={(event) => this.handleChange(event, 'slug')} type="text" value={slug} name="topic" placeholder="name your new topic" />
                        </label><br />
                        <label>
                            Description:
                            <input className='topicFormComponent' onChange={(event) => this.handleChange(event, 'description')} type="text" value={description} name="description" placeholder="describe this topic" />
                        </label><br />
                        <label>
                            Image URL:
                            <input className='topicFormComponent' onChange={(event) => this.handleChange(event, 'imgURL')} type="text" value={imgURL} name="imageURL" placeholder="enter the URL for your chosen image" />
                        </label><br />
                        <button className='topicFormComponent' disabled={!(slug && description && this.props.loggedIn)} onClick={this.handleSubmit}>Create New Topic</button>

                    </form>
                </label>
            </div>
        );
    }
    handleChange = (event, input) => {
        this.setState({ [input]: event.target.value })
    }
    handleSubmit = (event) => {
        event.preventDefault()
        let {slug, description, imgURL} = this.state;
            api.createTopic(slug, description, imgURL)
                .then(data => {
                    this.setState({newTopicData: data, slug : '', description : '', imgURL : ''})
                })
                .catch(err => console.log(err))
    }
}

export default CreateTopic;

