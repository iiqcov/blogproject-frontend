import React, { useState } from 'react'; 
import TextareaAutosize from 'react-textarea-autosize';

import FolderList from './folder/FolderView';
import ImageUpload from './image/ImageUpload';
import CheckLogin from './login/CheckLogin'; 
import MarkdownRender from '../utils/MarkdownRenderer';
import PostArticle from './article/PostArticle';
import TempSaveArticle from './article/TempSaveArticle';

import '../styles/CreateArticle.css';

const CreateArticle = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [folderInput, setFolderInput] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [articleId, setArticleId] = useState(null);

    const handleImageUpload = (imageUrl) => {
        setContent(`${content}\n<img src="${imageUrl}" width="500">`);
    };

    const handleThumbnailUpload = (imageUrl) => {
        setThumbnail(imageUrl);
    }

    return (
        <form className="container custom-container">
            <CheckLogin/>
            <div>
                <FolderList input={folderInput} setInput={setFolderInput} />
                <div style={{width: '500px', height: '300px', overflow: 'hidden', border: '1px dashed gray', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    {thumbnail ? (
                        <img src={thumbnail} alt="thumbnail" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                    ) : (
                        <p>썸네일을 등록해주세요</p>
                    )}
                </div>
                <ImageUpload onUpload={handleThumbnailUpload} />
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
                <TempSaveArticle 
                    title={title}
                    content={content}
                    folderInput={folderInput}
                    thumbnailLink={thumbnail}
                    isSubmitted={isSubmitted}
                    setIsSubmitted={setIsSubmitted}
                    articleId={articleId}
                    setArticleId={setArticleId}
                />
                <PostArticle 
                    title={title}
                    content={content}
                    folderInput={folderInput}
                    thumbnailLink={thumbnail}
                    isSubmitted={isSubmitted}
                    setIsSubmitted={setIsSubmitted}
                    articleId={articleId}
                    setArticleId={setArticleId}
                />
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

export default CreateArticle;
