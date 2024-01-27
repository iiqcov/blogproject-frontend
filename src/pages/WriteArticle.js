import React from 'react';

import CreateArticle from '../components/CreateArticle';
import Header from '../common/Header'
import Footer from '../common/Footer';

const WriteArticle = () => {
    return (
        <div>
            <div>
                <Header/>;
            </div>
            <CreateArticle />;
            <Footer/>
        </div>
    )
};

export default WriteArticle;