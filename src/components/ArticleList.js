import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../common/Header';
import Sidebar from '../common/Sidebar';

const ArticleList = () => {
    const [articles, setArticles] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8080/articles')
            .then(res => {
                setArticles(res.data);
            });
    }, []);

    const handleGoToArticleList = ()=>{
        navigate('/');
    };

    return (
        <div>
            <Header/>
            <div style={{ display: 'flex' }}>
                <Sidebar/>
                <div style={{ marginLeft: '320px' }}> {/* 사이드바 너비 + 패딩 */}
                    <button onClick={handleGoToArticleList}>HOME</button>
                    {articles.map((article, index) => 
                    <div key={`article-${index}`}>
                        <h5>{article.title}</h5>
                        <Link to={`/article/${article.id}`}>보러가기</Link>
                    </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ArticleList;
