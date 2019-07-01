import React from 'react';
import { Link } from '@reach/router'

const Home = () => {
    return (
        <div >
            <Link to='/articles'>
                <img className="mainImg" src="https://www.kshs.org/research/collections/documents/newspapers/newspapers2.jpg" alt="A clickable set of newspapers" />
            </Link>
        </div>
    );
};

export default Home;