import React, { Component } from 'react';
import * as api from './api';
import { Link } from '@reach/router';

class Topics extends Component {
    state = {
        topics: null
    }
    render() {
        let { topics } = this.state;
        return (
            <div>
                {topics && topics.map(topic => {
                    return (
                        <Link
                            to={`/articles`}
                            state={
                                { topic: topic.slug }
                            }>

                            < div className="topicCard">
                                Topic: {topic.slug} <br />
                                Description: {topic.description}
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
                this.setState({ topics: topics })
            })
    }
}

export default Topics;