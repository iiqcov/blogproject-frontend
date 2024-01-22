import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApi } from '../utils/useApi';
import TextareaAutosize from 'react-textarea-autosize';
import ImageUpload from './image/ImageUpload';

import CheckLogin from './login/CheckLogin';
import MarkdownRender from '../utils/MarkdownRenderer';
import Toggle from './button/Toggle';

const EditArticle = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [isPublic, setIsPublic] = useState('');

    const navigate = useNavigate();
    const api = useApi();

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const res = await api.get(`/article/${id}`);
                setTitle(res.data.title);
                setContent(res.data.content);
                setThumbnail(res.data.thumbnailLink);
                setIsPublic(res.data.publicStatus);
            } catch (error) {
                console.error('Failed to fetch article', error);
            }
        };
        fetchArticle();
    }, [id]);

    const handleImageUpload = (imageUrl) => {
        setContent(prevContent => `${prevContent}\n<img src="${imageUrl}" width="500">`);
    };
    
    const handleThumbnailUpload = (imageUrl) => {
        setThumbnail(imageUrl);
    }

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
                thumbnailLink: thumbnail,
                publicStatus: isPublic,
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
            <CheckLogin/>
            <div>
                <div style={{width: '500px', height: '300px', overflow: 'hidden', border: '1px dashed gray', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    {thumbnail ? (
                        <img src={thumbnail} alt="thumbnail" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                    ) : (
                        <p>썸네일을 등록해주세요</p>
                    )}
                </div>
                <ImageUpload onUpload={handleThumbnailUpload} />
                <Toggle isToggled={isPublic} setIsToggled={setIsPublic} /> 
            </div>
            <div className="custom-input-field">
                <input 
                    type="text" 
                    value={title} 
                    onChange={e => setTitle(e.target.value)} 
                    placeholder="Title" 
                    className="input-field"
                />
                <ImageUpload onUpload={handleImageUpload} />
                <button type="submit" className="submit-button custom-submit-button">Submit</button>
            </div>
            <div className="editor-container custom-editor-container">
            <TextareaAutosize 
                value={content} 
                onChange={(event) => {setContent(event.target.value)}}
                className="textarea-field custom-textarea-field"
            />
            <MarkdownRender content={content} />
        </div>
        </form>
    );
};

export default EditArticle;
