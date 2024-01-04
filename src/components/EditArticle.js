import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import {useApi} from '../utils/useApi'
import MarkdownEditor from '@uiw/react-markdown-editor';

const EditArticle = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();
    const api = useApi();

    useEffect(() => {
        const token = Cookies.get('token');
        if (!token) {
            alert('로그인이 필요합니다.');
            navigate('/login');
        } else {
            const fetchArticle = async () => {
                try {
                    const res = await api.get(`/article/${id}`);
                    setTitle(res.data.title);
                    setContent(res.data.content);
                } catch (error) {
                    console.error('Failed to fetch article', error);
                }
            };

            fetchArticle();
        }
    }, []);

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

        try {
            const response = await api.put(`/api/article/${id}`, {
                title: title,
                content: content,
            });
            if (response.status === 200 || response.status === 201) {
                alert('수정이 완료되었습니다.');
                navigate(`/article/${id}`);
            } else {
                throw new Error('Failed to create article 22 ');
            }
        } catch (error) {
            console.error('Failed to update article?', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
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
            <button type="submit">수정 완료</button>
        </form>
    );
};

export default EditArticle;
