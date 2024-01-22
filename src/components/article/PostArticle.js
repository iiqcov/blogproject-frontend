import React from 'react';
import { useApi } from '../../utils/useApi';
import { useNavigate } from 'react-router-dom';

const PostArticle = ({ title, content, folderInput, thumbnailLink, isSubmitted, setIsSubmitted, articleId, setArticleId }) => {
    const api = useApi();
    const navigate = useNavigate();

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
            let response;
            if (!isSubmitted) {
                response = await api.post(`/api/article`, {
                    title: title,
                    content: content,
                    thumbnailLink: thumbnailLink,
                    folder: folderInput,
                });
                setIsSubmitted(true);
                setArticleId(response.data.id);
            } else {
                response = await api.put(`/api/article/${articleId}`, {
                    title: title,
                    content: content,
                    thumbnailLink: thumbnailLink,
                });
            }

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
        <button type="submit" onClick={handleSubmit} className="submit-button custom-submit-button">Submit</button>
    );
};

export default PostArticle;
