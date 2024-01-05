import React, { useState, useEffect, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../utils/useApi';
import Cookies from 'js-cookie';
import { marked } from 'marked';
import TextareaAutosize from 'react-textarea-autosize';

import '../styles/CreateArticle.css';

const CreateArticle = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const navigate = useNavigate();
    const api = useApi();
    const textareaRef = useRef(null); 

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
        <form onSubmit={handleSubmit} className="container custom-container">
            <div className="custom-input-field">
                <input 
                    type="text" 
                    value={title} 
                    onChange={e => setTitle(e.target.value)} 
                    placeholder="Title" 
                    className="input-field"
                />
                <button type="submit" className="submit-button custom-submit-button">Submit</button>
            </div>
            <div className="editor-container custom-editor-container">
                <TextareaAutosize 
                    value={content} 
                    onChange={(event) => {setContent(event.target.value)}}
                    className="textarea-field custom-textarea-field"
                />
                <div 
                    dangerouslySetInnerHTML={{__html: marked(content)}}
                    className="markdown-preview custom-markdown-preview"
                />
            </div>
        </form>
    );
};

export default CreateArticle;
