import React from 'react';

import {useApi} from '../../api/api';

import '../../styles/ImageUpload.css'

const ImageUpload = ({ onUpload, buttonText = '파일 선택' }) => {
    const api=useApi();

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
            const response = await api.post('/api/image', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            });

            const imageUrl = response.data.imageUrl;
            onUpload(imageUrl);
        } catch (error) {
            alert('이미지 업로드에 실패했습니다.');
        }
        event.target.value=null;
    };

    return (
        <div className="upload-button">
            <label>
                {buttonText}
                <input 
                    type="file"
                    onChange={handleImageUpload}
                />
            </label>
        </div>
    );
};

export default ImageUpload;
