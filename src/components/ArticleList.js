import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link} from 'react-router-dom';
import Header from '../common/Header';
import Sidebar from '../common/Sidebar';
import Footer from '../common/Footer';

const ArticleList = ({ url }) => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        axios.get(url)
            .then(res => {
                if (Array.isArray(res.data)) {
                    setArticles(res.data);
                } else {
                    console.error('Data is not an array');
                }
            });
    }, [url]);

    return (
        <div>
            <Header/>
            <div style={{ display: 'flex' }}>
                <Sidebar/>
                <div style={{ marginLeft: '320px' }}>
                    {articles.map((article, index) => 
                    <div key={`article-${index}`}>
                        <h5>{article.title}</h5>
                        {article.folderName && <h5>{article.folderName}</h5>}
                        {article.thumbnailLink && (
                            <div style={{width: '500px', height: '300px', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <img src={article.thumbnailLink} alt="thumbnail" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                            </div>
                        )}
                        <Link to={`/article/${article.id}`}>보러가기</Link>
                    </div>
                    )}
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default ArticleList;
