import React, { Component } from 'react';
import * as api from '../api';
import { Link } from '@reach/router';
import * as lookup from '../lookup';

class Topics extends Component {
    state = {
        topics: null,
        isLoading: true
    }
    render() {
        const { topics } = this.state
        console.log(topics)
        return (
            <div>
                {this.state.isLoading && <div>Loading Topics List...</div>}
                {topics && topics.map(topic => {
                    console.log(topic)
                    return (
                        <Link key={topic.slug}
                            to={`/articles`}
                            state={
                                { topic: topic.slug }
                            }>

                            < div className="topicCard">
                                <p></p>
                                <p></p>
                                <h3 >{topic.slug.charAt(0).toUpperCase() + topic.slug.slice(1)} </h3><br />
                                {topic.description}
                                <div><img className="topicImg" alt="topic related img" src={topic.imgURL|| lookup.topicUrls.default} /></div>
                                <p></p><p></p>
                            </div>
                        </Link>
                    )
                })}
            </div>
        );
    }
    componentDidMount = () => {
        api.fetchTopics()
            .then(topics => {
                this.setState({ topics: topics, isLoading: false })
            })
    }
}
export default Topics;