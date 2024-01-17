import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const ImageUpload = ({ onUpload }) => {
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
            onUpload(imageUrl);
        } catch (error) {
            console.error('Failed to upload image', error);
            alert('이미지 업로드에 실패했습니다.');
        }
        event.target.value=null;
    };

    return (
        <input 
            type="file"
            onChange={handleImageUpload}
            className="upload-button"
        />
    );
};

export default ImageUpload;
