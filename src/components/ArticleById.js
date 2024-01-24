import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import {useApi} from '../utils/useApi'
import Header from '../common/Header'
import Sidebar from '../common/Sidebar';
import MarkdownRender from '../utils/MarkdownRenderer';

import '../styles/ArticleById.css'

const Article = () => {
    const { id } = useParams();
    const [article, setArticle] = useState(null);
    const navigate = useNavigate();
    const api = useApi();

    const token = Cookies.get('token');

    useEffect(() => {
        axios.get(`http://localhost:8080/article/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => {
            setArticle(res.data);
        })
        .catch(error => {
            if (error.response && error.response.status === 403) {
                navigate('/forbidden_page');
            }
        });
    }, [id, token, navigate]);
    
    

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
            <div className='header'>
                <Header/>
            </div>
            <div>
                <div className='sidebar'>
                    <Sidebar/>
                </div>
                <div className="article-content">
                    <div className="article-folder">
                        <h5>{article.folder.name}</h5>
                    </div>
                    <div className="article-title">
                        <h1>{article.title}</h1>
                    </div>
                    <div className="title-separator"></div> 
                    <div className="article-body">
                        <MarkdownRender content={article.content} />
                    </div>
                    <div className="article-actions">
                        {token && <button onClick={handleDelete}>Delete</button>}
                        {token && <button onClick={handleEdit}>수정하기</button>}
                        {token && <button onClick={handleGoToArticleList}>글 목록으로 가기</button>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Article;
