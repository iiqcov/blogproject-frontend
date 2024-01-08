import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApi } from '../utils/useApi';
import Cookies from 'js-cookie';
import axios from 'axios';
import TextareaAutosize from 'react-textarea-autosize';
import { marked } from 'marked';

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

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) {
            alert('이미지를 선택해주세요.');
            return;
        }
        const formData = new FormData();
        formData.append('image', file);

        if (!formData.has('image')) {
            alert('이미지 파일이 업로드되지 않았습니다.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/api/image', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${Cookies.get('token')}`
            },
            });

            const imageUrl = response.data.imageUrl;
            console.log(imageUrl);
            setContent(content + '\n' + '![](' + imageUrl+')');
        } catch (error) {
            console.error('Failed to upload image', error);
            alert('이미지 업로드에 실패했습니다.');
        }
        event.target.value=null;
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
            <div className="custom-input-field">
                <input 
                    type="text" 
                    value={title} 
                    onChange={e => setTitle(e.target.value)} 
                    placeholder="Title" 
                    className="input-field"
                />
                <input 
                    type="file"
                    onChange={handleImageUpload}
                    className="upload-button"
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

export default EditArticle;
