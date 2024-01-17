import React, { useState} from 'react'; 
import { useNavigate } from 'react-router-dom';
import { useApi } from '../utils/useApi';
import { marked } from 'marked';
import TextareaAutosize from 'react-textarea-autosize';

import FolderList from './folder/FolderView';
import ImageUpload from './image/ImageUpload';
import CheckLogin from './login/CheckLogin'; 

import '../styles/CreateArticle.css';

const CreateArticle = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [folderInput, setFolderInput] = useState('');

    const navigate = useNavigate();
    const api = useApi();

    const handleImageUpload = (imageUrl) => {
        setContent(`${content}\n<img src="${imageUrl}" width="500">`);
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
            const response = await api.post('/api/article', {
                title: title,
                content: content,
                folder: folderInput,
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
        }
    };

    return (
        <form onSubmit={handleSubmit} className="container custom-container">
            <CheckLogin/>
            <FolderList input={folderInput} setInput={setFolderInput} />
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
                <div 
                    dangerouslySetInnerHTML={{__html: marked(content)}}
                    className="markdown-preview custom-markdown-preview"
                />
            </div>
        </form>
    );
};

export default CreateArticle;