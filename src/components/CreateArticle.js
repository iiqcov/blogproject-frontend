import React, { useState } from 'react'; 
import TextareaAutosize from 'react-textarea-autosize';

import FolderList from './folder/FolderView';
import ImageUpload from './image/ImageUpload';
import CheckLogin from './login/CheckLogin'; 
import MarkdownRender from '../utils/MarkdownRenderer';
import PostArticle from './article/PostArticle';
import TempSaveArticle from './article/TempSaveArticle';
import Toggle from './button/Toggle';

import '../styles/CreateArticle.css';

const CreateArticle = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [folderInput, setFolderInput] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [articleId, setArticleId] = useState(null);
    const [isPublic, setIsPublic] = useState(false);

    const handleImageUpload = (imageUrl) => {
        setContent(`${content}\n<img src="${imageUrl}" width="500">`);
    };

    const handleThumbnailUpload = (imageUrl) => {
        setThumbnail(imageUrl);
    }

    return (
        <form className="container custom-container">
            <CheckLogin/>
            <div className="custom-div">
                <div className="thumbnail-container">
                    {thumbnail ? (
                        <img src={thumbnail} alt="thumbnail" className="thumbnail-image" />
                    ) : (
                        <p className="thumbnail-placeholder">썸네일을 등록해주세요</p>
                    )}
                </div>
                <div className='setting'>
                    <div className="image-button">
                        <ImageUpload onUpload={handleThumbnailUpload} buttonText="Thumbnail" />
                    </div>
                    <div className="image-button">
                        <ImageUpload onUpload={handleImageUpload} buttonText="Image" />
                    </div>
                    <div className="toggle-container">
                        <Toggle isToggled={isPublic} setIsToggled={setIsPublic} />
                    </div>
                    <div className='folder-input'>
                        <FolderList input={folderInput} setInput={setFolderInput} />
                    </div>
                </div>
            </div>
            <div className="custom-input-field">
                <input 
                    type="text" 
                    value={title} 
                    onChange={e => setTitle(e.target.value)} 
                    placeholder="Title" 
                    className="input-field"
                />
                <div className="temp-save-button">
                    <TempSaveArticle 
                        title={title}
                        content={content}
                        folderInput={folderInput}
                        thumbnailLink={thumbnail}
                        isSubmitted={isSubmitted}
                        setIsSubmitted={setIsSubmitted}
                        articleId={articleId}
                        setArticleId={setArticleId}
                        isPublic={isPublic}
                    />
                </div>
                <div className="post-article-button">
                    <PostArticle 
                        title={title}
                        content={content}
                        folderInput={folderInput}
                        thumbnailLink={thumbnail}
                        isSubmitted={isSubmitted}
                        setIsSubmitted={setIsSubmitted}
                        articleId={articleId}
                        setArticleId={setArticleId}
                        isPublic={isPublic}
                    />
                </div>
            </div>
            <div className="custom-editor-container">
                <TextareaAutosize 
                    value={content} 
                    onChange={(event) => {setContent(event.target.value)}}
                    className="textarea-field custom-textarea-field"
                />
                <MarkdownRender 
                    content={content} 
                    className="rendered-field"
                />
            </div>
        </form>
    );
    
    
};

export default CreateArticle;
