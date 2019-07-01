import React, { Component } from 'react';
import * as api from '../api';
import { Link } from '@reach/router';

class Topics extends Component {
    state = {
        topics: null,
        coding: 'https://cdn2.itpro.co.uk/sites/itpro/files/styles/article_main_wide_image/public/2018/09/bajavascripthack_shutterstock_720388555.jpg?itok=2Axp53CC',
        football: 'https://www.europeandatajournalism.eu/var/ezdemo_site/storage/images/news/data-news/european-football-ever-richer-and-more-unequal/4855-11-eng-GB/European-football-ever-richer-and-more-unequal_imagefullwide.jpg',
        cooking: 'https://res.cloudinary.com/simplotel/image/upload/x_-1,y_0,w_1249,h_625,r_0,c_crop,q_60,fl_progressive/w_1249,f_auto,c_fit/colonels-retreat/Treat,Colonels_Retreat,_Cooking_Classes_in_Delhi_1'
    }
    render() {
        let { topics } = this.state;
        return (
            <div>
                {topics && topics.map(topic => {
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
                                <div><img className="topicImg" alt="topic related img" src={this.state[topic.slug]} /></div>
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
                this.setState({ topics: topics })
            })
    }
}
export default Topics;