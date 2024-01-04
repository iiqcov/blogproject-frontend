import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../common/Header'
import ReactMarkdown from 'react-markdown'
import Cookies from 'js-cookie';
import {useApi} from '../utils/useApi'

const Article = () => {
    const { id } = useParams();
    const [article, setArticle] = useState(null);
    const navigate = useNavigate();
    const api = useApi();

    useEffect(() => {
        axios.get(`http://localhost:8080/article/${id}`)
            .then(res => {
                setArticle(res.data);
            });
    }, [id]);

    const handleDelete = async () => {
        if (window.confirm('삭제하시겠습니까?')) {
            try {
                const response = await api.delete(`/api/article/${id}`);
                if (response.status === 204) {
                    alert('삭제가 완료되었습니다.');
                    navigate(`/articles`);
                } else {
                    throw new Error('Failed to create article');
                }
            } catch (error) {
                console.error('Failed to delete article', error);
            }
        }
    };

    const handleEdit = () => {
        const token = Cookies.get('token');
        if (token) {
            navigate(`/edit-article/${id}`);  // 수정 페이지로 이동
        } else {
            alert('로그인이 필요합니다.');
        }
    };

    const handleGoToArticleList = ()=>{
        navigate('/articles');
    };

    if (!article) return null;

    return (
        <div>
            <header>
                <Header/>;
            </header>
            <h1>{article.title}</h1>
            <ReactMarkdown>{article.content}</ReactMarkdown>
            <p>Created at: {new Date(article.created_at).toLocaleString()}</p>
            <p>Updated at: {new Date(article.updated_at).toLocaleString()}</p>
            <button onClick={handleDelete}>Delete</button>
            <button onClick={handleEdit}>수정하기</button>
            <button onClick={handleGoToArticleList}>글 목록으로 가기</button>
        </div>
    );
}

export default Article;