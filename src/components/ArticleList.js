import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../common/Header';
import Sidebar from '../common/Sidebar';

const ArticleList = ({ url }) => {
    const [articles, setArticles] = useState([]);
    const navigate = useNavigate();

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
                        {article.thumbnailLink && <img src={article.thumbnailLink} alt="thumbnail" style={{width: '500px', height: '300px'}} />}
                        <Link to={`/article/${article.id}`}>보러가기</Link>
                    </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ArticleList;
