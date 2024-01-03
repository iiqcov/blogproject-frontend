import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const CreateArticle = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            alert('로그인이 필요합니다.');
            navigate('/login');
        }
    }, [navigate]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios({
                method: 'POST',
                url: 'http://localhost:8080/api/articles',
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('access_token'),
                    'Content-Type': 'application/json',
                },
                data: {
                    title: title,
                    content: content,
                },
            });

            if (response.status === 200 || response.status === 201) {
                alert('등록 완료되었습니다.');
                navigate('/articles');
            } else {
                throw new Error('Failed to create article');
            }
        } catch (error) {
            console.error('Failed to create article', error);
            alert('등록 실패했습니다.');
            navigate('/login');
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
            <button type="submit">Submit</button>
        </form>
    );
};

export default CreateArticle;
