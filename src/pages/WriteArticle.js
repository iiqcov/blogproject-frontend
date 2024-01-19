import React from 'react';
import CreateArticle from '../components/CreateArticle';
import Header from '../common/Header'
import Footer from '../common/Footer';

const WriteArticle = () => {
    return (
        <div>
            <Header/>;
            <CreateArticle />;
            <Footer/>
        </div>
    )
};

export default WriteArticle;