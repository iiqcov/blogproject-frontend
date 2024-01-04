import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../utils/useApi';
import Cookies from 'js-cookie';
import MarkdownEditor from '@uiw/react-markdown-editor';

import '../styles/CreateArticle.css'

const CreateArticle = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const navigate = useNavigate();
    const api = useApi();
    

    useEffect(() => {
        const token = Cookies.get('token');
        if (!token) {
            alert('로그인이 필요합니다.');
            navigate('/login');
        }
    }, [navigate]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (title === undefined) {
            alert('제목을 입력해주세요.');
            return;
        }

        if (content === undefined) {
            alert('내용을 입력해주세요.');
            return;
        }

         console.log('Title:', title);
        console.log('Content:', content);


        try {
            const response = await api.post('/api/article', {
                title: title,
                content: content,
            });

            if (response.status === 200 || response.status === 201) {
                alert('등록 완료되었습니다.');
                navigate('/articles');
            } else {
                throw new Error('Failed to create article 22 ');
            }
        } catch (error) {
            console.error('Failed to create article 333333', error);
            alert('등록 실패했습니다.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="container">
            <input 
                type="text" 
                value={title} 
                onChange={e => setTitle(e.target.value)} 
                placeholder="Title" 
                className="input-field"
            />
            <MarkdownEditor 
                value={content} 
                onChange={(value, viewUpdate) => {setContent(value)}}
                className="textarea-field"
            />
            <button type="submit" className="submit-button">Submit</button>
        </form>
    );
};

export default CreateArticle;
