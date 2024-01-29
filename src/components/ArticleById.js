import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import {useApi} from '../api/api';

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
        api.get(`/article/${id}`)
        .then(res => {
            setArticle(res.data);
        })
        .catch(error => {
            if (error.response && error.response.status === 403) {
                navigate('/forbidden_page');
            }
        });
    }, [id, navigate, api]);
    
    

    const handleDelete = async () => {
        if (window.confirm('삭제하시겠습니까?')) {
            try {
                const response = await api.delete(`/api/article/${id}`);
                if (response.status === 204) {
                    alert('삭제가 완료되었습니다.');
                    navigate(`/`);
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
            navigate(`/edit-article/${id}`);
        } else {
            alert('로그인이 필요합니다.');
        }
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
                        <h5>{article.folderName}</h5>
                    </div>
                    <div className="article-title">
                        <h1>{article.title}</h1>
                    </div>
                    <div className="article-actions">
                    {token && 
                        <div className="button-container">
                            <button onClick={handleDelete} className="delete-button custom-button">Delete</button>
                            <button onClick={handleEdit} className="edit-button custom-button">Edit</button>
                        </div>
                        }
                    </div>
                    <div className="title-separator"></div> 
                    <div className="article-body">
                        <MarkdownRender content={article.content} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Article;
