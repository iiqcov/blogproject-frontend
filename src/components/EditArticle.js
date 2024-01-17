import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApi } from '../utils/useApi';
import TextareaAutosize from 'react-textarea-autosize';
import ImageUpload from './image/ImageUpload';
import { marked } from 'marked';

import FolderView from './folder/FolderView';
import CheckLogin from './login/CheckLogin';

const EditArticle = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const navigate = useNavigate();
    const api = useApi();

    useEffect(() => {
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
    }, [id]);

    const handleImageUpload = (imageUrl) => {
        setContent(prevContent => `${prevContent}\n<img src="${imageUrl}" width="500">`);
    };
    

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
        <form onSubmit={handleSubmit} className="container custom-container">
            <CheckLogin />
            <FolderView />
            <div className="custom-input-field">
                <input 
                    type="text" 
                    value={title} 
                    onChange={e => setTitle(e.target.value)} 
                    placeholder="Title" 
                    className="input-field"
                />
                <ImageUpload onUpload={handleImageUpload} />
                <button type="submit" className="submit-button custom-submit-button">수정완료</button>
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

export default EditArticle;
