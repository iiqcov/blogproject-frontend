import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';  // useNavigate 추가
import Header from '../common/Header'
import ReactMarkdown from 'react-markdown'

const ArticleList = () => {
    const [articles, setArticles] = useState([]);
    const navigate = useNavigate();  // navigate 정의

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
            <button onClick={handleGoToArticleList}>HOME</button>
            {articles.map((article, index) => 
            <div key={`article-${index}`}>
                <h2>{article.id}</h2>
                <h5>{article.title}</h5>
                <ReactMarkdown>{article.content}</ReactMarkdown>
                <Link to={`/article/${article.id}`}>보러가기</Link>
            </div>
            )}
        </div>
    );
}

export default ArticleList;