import React, { Component } from 'react';
import * as api from './api';

class SubmitArticle extends Component {
    state = {
        title: '',
        topic: '',
        username: this.props.username,
        body: '',
        topics: null,
    }
    render() {
        let { topics } = this.state;
        return (
            <div> <h2>Article Submission Form</h2>
                <label> You are logged in as: "{this.state.username}"
                <p></p>
                    <form className='articleForm' onSubmit={this.handleSubmit}>
                        <label>
                            Title:
                    <input className='articleFormComponent' onChange={(event) => this.handleChange(event, 'title')} type="text" name="title" placeholder="Article Title" />
                        </label><br />
                        <label>Topic Selection:
                        <select className='articleFormComponent' onChange={(event) => {
                                this.handleChange(event, 'topic')
                            }} defaultValue={''}>
                                <option value={''}>Topic</option>
                                {topics && topics.map(topic => {
                                    return <option key={topic.slug} value={topic.slug} name={topic.slug}>{topic.slug.charAt(0).toUpperCase() + topic.slug.slice(1)} </option>
                                })}
                            </select>
                        </label>
                        <br />
                        <label>
                            Article Body:
                    <input className='articleFormComponent' onChange={(event) => this.handleChange(event, 'body')} type="text" name="body" placeholder="Write your article here!" />
                        </label><br />
                        <button className='articleFormComponent' onClick={this.handleSubmit}>Create Your Article</button>
                    </form>
                </label>
            </div>
        );
    }
    componentDidMount = () => {
        api.fetchTopics()
            .then(topics => {
                this.setState({ topics: topics })
            })
            .catch(err => console.log(err))
    }
    handleChange = (event, input) => {
        console.log(event.target.value, '-->', input)
        this.setState({ [input]: event.target.value })
    }
    handleSubmit = (event) => {
        let { title, topic, username, body } = this.state;
        console.log(title, topic, username, body)
        event.preventDefault()
        api.postArticle(title, topic, username, body)
            .then()
            .catch(console.dir)
    }
}

export default SubmitArticle;