import React, { Component } from 'react';
import * as api from '../api';
import { navigate } from '@reach/router'

class SubmitArticle extends Component {
    state = {
        title: '',
        topic: '',
        username: this.props.username,
        body: '',
        topics: '',
    }
    render() {
        const { title, topic, username, body, topics } = this.state;
        return (
            <div>
                <h2>Article Submission Form</h2>
                <label> {this.props.loggedIn ? <>You are logged in as: "{this.state.username}"</> : <div className='submissionWarning'>You must log in to submit an article!</div>}
                    <form className='articleForm' onSubmit={this.handleSubmit}>
                        <label className='articleFormComponent'>
                            Title:      
                        </label> 
                        <input className='articleFormComponent' onChange={(event) => this.handleChange(event, 'title')} type="text" name="title" placeholder="Article Title" />
                 
                        <label className='articleFormComponent'>
                            Topic Selection:
                        </label>
                        <select className='articleFormComponent' onChange={(event) => {
                                this.handleChange(event, 'topic')
                            }} defaultValue={''}>
                                <option value={''}>Topic</option>
                                {topics && topics.map(topic => {
                                    return <option key={topic.slug} value={topic.slug} name={topic.slug}>{topic.slug.charAt(0).toUpperCase() + topic.slug.slice(1)} </option>
                                })}
                            </select>
                        
                        <br />
                        <label>
                            <textarea rows="10" cols="300" className='articleFormComponent' onChange={(event) => this.handleChange(event, 'body')} name="body" placeholder="Write your article here!" />
                        </label><br />
                        <button className='articleFormComponent' disabled={!(title && topic && username && body)} onClick={this.handleSubmit}>Create Your Article</button>
                    </form>
                </label>
            </div>
        )
    }
    componentDidMount = () => {
        api.fetchTopics()
            .then(topics => {
                this.setState({ topics: topics })
            })
            .catch(err => console.log(err))
    }
    handleChange = (event, input) => {
        this.setState({ [input]: event.target.value })
    }
    handleSubmit = (event) => {
        event.preventDefault()
        const { title, topic, username, body } = this.state;
        api.postArticle(title, topic, username, body)
            .then(res => {
                navigate(`/articles/${res['New Article Created'].article_id}`)
            })
            .catch(console.dir)
    }
}

export default SubmitArticle;