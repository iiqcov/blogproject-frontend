import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../common/Header'

const Article = () => {
    const { id } = useParams();
    const [article, setArticle] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8080/articles/${id}`)
            .then(res => {
                setArticle(res.data);
            });
    }, [id]);

    const handleDelete = async () => {
        if (window.confirm('삭제하시겠습니까?')) {
            try {
                await axios.delete(`http://localhost:8080/article/${id}`);
                navigate('/articles');  // 삭제 후 게시글 목록 페이지로 이동
            } catch (error) {
                console.error('Failed to delete article', error);
            }
        }
    };

    const handleEdit = () => {
        navigate(`/edit-article/${id}`);  // 수정 페이지로 이동
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
            <h2>{article.id}</h2>
            <h5>{article.title}</h5>
            <p>{article.content}</p>
            <p>Created at: {new Date(article.created_at).toLocaleString()}</p>
            <p>Updated at: {new Date(article.updated_at).toLocaleString()}</p>
            <button onClick={handleDelete}>Delete</button>
            <button onClick={handleEdit}>수정하기</button>
            <button onClick={handleGoToArticleList}>글 목록으로 가기</button>
        </div>
    );
}

export default Article;
