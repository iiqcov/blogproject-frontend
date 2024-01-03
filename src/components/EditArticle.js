import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditArticle = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            alert('로그인이 필요합니다.');
            navigate('/login');
        } else {
            const fetchArticle = async () => {
                try {
                    const res = await axios.get(`http://localhost:8080/articles/${id}`);
                    setTitle(res.data.title);
                    setContent(res.data.content);
                } catch (error) {
                    console.error('Failed to fetch article', error);
                }
            };

            fetchArticle();
        }
    }, [id, navigate]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await axios.put(`http://localhost:8080/article/${id}`, { title, content });
            navigate(`/articles/${id}`);  // 수정된 부분
        } catch (error) {
            console.error('Failed to update article', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Title:
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
            </label>
            <label>
                Content:
                <textarea value={content} onChange={e => setContent(e.target.value)} />
            </label>
            <button type="submit">수정 완료</button>
        </form>
    );
};

export default EditArticle;
